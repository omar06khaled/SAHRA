import type { ActiveQuestion, LogEntry, Phase, Team, TeamIndex } from './types';

const KEY = 'sahra.game.v2';
const RESUMABLE_PHASES: Phase[] = ['board', 'question', 'reveal'];
const SAVED_PHASES: Phase[] = ['board', 'question', 'reveal', 'final'];

export interface SavedGame {
  v: 2;
  phase: Phase;
  teams: [Team, Team];
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn0: number;
  log: LogEntry[];
  active: ActiveQuestion | null;
  variants: Record<string, number>;
  deadline: number;
  pausedLeft: number;
  phoneUntil: number;
}

export function saveGame(s: {
  phase: Phase;
  teams: [Team, Team];
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn0: number;
  log: LogEntry[];
  active: ActiveQuestion | null;
  variants: Record<string, number>;
  deadline: number;
  pausedLeft: number;
  phoneUntil: number;
}): void {
  if (!SAVED_PHASES.includes(s.phase)) return;
  try {
    const payload: SavedGame = {
      v: 2,
      phase: s.phase,
      teams: s.teams,
      taken: s.taken,
      drafted: s.drafted,
      turn0: s.turn0,
      log: s.log,
      active: s.active,
      variants: s.variants,
      deadline: s.deadline,
      pausedLeft: s.pausedLeft,
      phoneUntil: s.phoneUntil,
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable (private mode, quota) — persistence is a nicety, not a requirement
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function loadSavedGame(): SavedGame | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const g = JSON.parse(raw) as SavedGame;
    if (!g || g.v !== 2) return null;
    if (!RESUMABLE_PHASES.includes(g.phase)) return null;
    if (!g.drafted || g.drafted.length < 6) return null;
    return g;
  } catch {
    return null;
  }
}
