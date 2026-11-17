import { useCallback, useEffect, useRef, useState } from 'react';
import { derive } from './derive';
import { secondsLeft } from './clock';
import { MARKS } from './intro';
import { resolveState } from './resolve';
import { clearSavedGame, loadSavedGame, saveGame } from './persistence';
import { PHONE_A_FRIEND_MS, TIMER_SECONDS, type LifelineKey } from './theme';
import { turnOf } from './helpers';
import { drawVariants } from './pool';
import { markPlayed, startGame } from './history';
import type { Award, GameState, LogEntry, Team, TeamIndex } from './types';

const blankTeam = (): Team => ({ name: '', members: ['', '', '', ''] });

const initialState: GameState = {
  phase: 'intro',
  teams: [blankTeam(), blankTeam()],
  taken: {},
  drafted: [],
  turn0: 0,
  log: [],
  active: null,
  variants: {},
  hover: null,
  deadline: 0,
  pausedLeft: 0,
  phoneUntil: 0,
  frozen: null,
  introT: 0,
  introDone: false,
};

export function useSahraGame() {
  const [state, setState] = useState<GameState>(initialState);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const introTimerRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const t0Ref = useRef(0);
  const resumedRef = useRef(false);
  const [, bumpClock] = useState(0);

  const playIntro = useCallback(() => {
    if (resumedRef.current) return;
    if (introTimerRef.current !== null) {
      clearInterval(introTimerRef.current);
      introTimerRef.current = null;
    }
    t0Ref.current = Date.now();
    const end = MARKS.m4;
    setState((s) => ({ ...s, phase: 'intro', introT: 0, introDone: false }));
    introTimerRef.current = window.setInterval(() => {
      const t = Date.now() - t0Ref.current;
      if (t >= end) {
        if (introTimerRef.current !== null) {
          clearInterval(introTimerRef.current);
          introTimerRef.current = null;
        }
        setState((s) =>
          s.phase === 'intro'
            ? { ...s, introT: end, introDone: true, phase: 'teams' }
            : { ...s, introT: end, introDone: true },
        );
        return;
      }
      setState((s) => ({ ...s, introT: t }));
    }, 16);
  }, []);

  const skipToTeams = useCallback(() => {
    if (introTimerRef.current !== null) {
      clearInterval(introTimerRef.current);
      introTimerRef.current = null;
    }
    setState((s) => ({ ...s, phase: 'teams' }));
  }, []);

  const goIntro = useCallback(() => {
    resumedRef.current = false;
    playIntro();
  }, [playIntro]);

  const endPhone = useCallback(() => {
    setState((s) => {
      if (!s.phoneUntil) return s;
      return { ...s, phoneUntil: 0, deadline: Date.now() + (s.pausedLeft || 0) * 1000, pausedLeft: 0 };
    });
  }, []);

  // Boot: resume an in-progress game from storage, or play the title animation.
  // No "already booted" guard here — under StrictMode's dev-only double-invoke
  // (mount → cleanup → mount), a guard would survive the cleanup and block the
  // second mount from ever restarting the interval the cleanup just cleared,
  // freezing the intro. The effect is written to be safe to run twice instead.
  useEffect(() => {
    const saved = loadSavedGame();
    if (saved) {
      resumedRef.current = true;
      setState((s) => ({
        ...s,
        phase: saved.phase === 'reveal' ? 'question' : saved.phase,
        teams: saved.teams,
        taken: saved.taken,
        drafted: saved.drafted,
        turn0: saved.turn0 || 0,
        log: saved.log || [],
        active: saved.active || null,
        variants: saved.variants || {},
        deadline: saved.deadline || 0,
        pausedLeft: saved.pausedLeft || 0,
        phoneUntil: saved.phoneUntil || 0,
        introT: MARKS.m4,
        introDone: true,
      }));
    } else {
      playIntro();
    }

    tickTimerRef.current = window.setInterval(() => {
      const s = stateRef.current;
      if (s.phase === 'question' || s.phase === 'reveal') bumpClock((c) => c + 1);
      if (s.phoneUntil && Date.now() >= s.phoneUntil) endPhone();
    }, 200);

    return () => {
      if (introTimerRef.current !== null) clearInterval(introTimerRef.current);
      if (tickTimerRef.current !== null) clearInterval(tickTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveGame(state);
  }, [state]);

  // Once a tile is opened, its question counts as played for future draws.
  const openedKey = state.active ? state.variants[`${state.active.cat}-${state.active.row}`] : undefined;
  useEffect(() => {
    if (openedKey) markPlayed(openedKey);
  }, [openedKey]);

  const setName = useCallback((ti: TeamIndex, v: string) => {
    setState((s) => {
      const teams = [...s.teams] as [Team, Team];
      teams[ti] = { ...teams[ti], name: v };
      return { ...s, teams };
    });
  }, []);

  const setMember = useCallback((ti: TeamIndex, mi: number, v: string) => {
    setState((s) => {
      const teams = [...s.teams] as [Team, Team];
      const members = [...teams[ti].members] as Team['members'];
      members[mi] = v;
      teams[ti] = { ...teams[ti], members };
      return { ...s, teams };
    });
  }, []);

  const goFamily = useCallback(() => {
    setState((s) => {
      const ready = s.teams.every((t) => t.name.trim().length > 0);
      return ready ? { ...s, phase: 'family' } : s;
    });
  }, []);

  const goTeams = useCallback(() => {
    setState((s) => ({ ...s, phase: 'teams' }));
  }, []);

  const goDraft = useCallback(() => {
    setState((s) => ({ ...s, phase: 'draft' }));
  }, []);

  const draftPick = useCallback((id: string) => {
    setState((s) => {
      if (s.taken[id] !== undefined || s.drafted.length >= 6) return s;
      const taken = { ...s.taken, [id]: (s.drafted.length % 2) as TeamIndex };
      return { ...s, taken, drafted: [...s.drafted, id] };
    });
  }, []);

  // Draw the questions once, here, rather than when a tile is opened — a tile
  // that redrew on open would hand a team a different question after an undo.
  // Drawn outside the state updater: starting a game writes to the play history,
  // and StrictMode runs updaters twice.
  const openBoard = useCallback(() => {
    const { drafted } = stateRef.current;
    if (drafted.length < 6) return;
    const variants = drawVariants(drafted, startGame());
    setState((s) => ({ ...s, phase: 'board', turn0: 0, log: [], variants }));
  }, []);

  const endGame = useCallback(() => {
    setState((s) => ({ ...s, phase: 'final' }));
  }, []);

  const setHover = useCallback((key: string | null) => {
    setState((s) => ({ ...s, hover: key }));
  }, []);

  const pick = useCallback((cat: string, row: number) => {
    setState((s) => {
      const d = derive(s.log, s.turn0);
      if (d.played[`${cat}-${row}`]) return s;
      return {
        ...s,
        phase: 'question',
        active: { cat, row },
        deadline: Date.now() + TIMER_SECONDS * 1000,
        pausedLeft: 0,
        phoneUntil: 0,
        hover: null,
      };
    });
  }, []);

  const useLifeline = useCallback((key: LifelineKey) => {
    setState((s) => {
      if (s.phase !== 'question' || !s.active) return s;
      const d = derive(s.log, s.turn0);
      if (d.activeLL || d.spent[d.turn][key]) return s;
      if (key === 'fawet') return resolveState(s, -1, 'fawet');
      const log: LogEntry[] = [...s.log, { t: 'll', team: d.turn, key }];
      const patch: Partial<GameState> = { log };
      if (key === 's3d') {
        patch.pausedLeft = secondsLeft(s);
        patch.phoneUntil = Date.now() + PHONE_A_FRIEND_MS;
      }
      return { ...s, ...patch };
    });
  }, []);

  const undo = useCallback(() => {
    setState((s) => {
      const log = s.log;
      if (!log.length) return s;
      const last = log[log.length - 1];
      const next = log.slice(0, -1);
      if (last.t === 'll') {
        const patch: Partial<GameState> = { log: next, phoneUntil: 0, pausedLeft: 0 };
        if (last.key === 's3d') patch.deadline = Date.now() + (s.pausedLeft || 0) * 1000;
        return { ...s, ...patch };
      }
      return { ...s, log: next, phase: 'board', active: null, frozen: null, phoneUntil: 0, pausedLeft: 0, hover: null };
    });
  }, []);

  const reveal = useCallback(() => {
    setState((s) => ({ ...s, phase: 'reveal', frozen: secondsLeft(s) }));
  }, []);

  const resolve = useCallback((award: Award) => {
    setState((s) => resolveState(s, award, null));
  }, []);

  const rematch = useCallback(() => {
    clearSavedGame();
    resumedRef.current = false;
    setState((s) => ({
      ...s,
      phase: 'draft',
      taken: {},
      drafted: [],
      turn0: 0,
      log: [],
      active: null,
      variants: {},
      phoneUntil: 0,
      pausedLeft: 0,
    }));
  }, []);

  const newPacks = useCallback(() => {
    clearSavedGame();
    resumedRef.current = false;
    setState((s) => ({
      ...s,
      taken: {},
      drafted: [],
      turn0: 0,
      log: [],
      active: null,
      variants: {},
      phoneUntil: 0,
      pausedLeft: 0,
      teams: [blankTeam(), blankTeam()],
    }));
    playIntro();
  }, [playIntro]);

  const derived = derive(state.log, state.turn0);
  const turn = turnOf(state, derived.turn);

  return {
    state,
    derived,
    turn,
    actions: {
      skipToTeams,
      goIntro,
      goFamily,
      goTeams,
      goDraft,
      setName,
      setMember,
      draftPick,
      openBoard,
      endGame,
      setHover,
      pick,
      useLifeline,
      endPhone,
      undo,
      reveal,
      resolve,
      rematch,
      newPacks,
    },
  };
}
