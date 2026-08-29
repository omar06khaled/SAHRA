import { derive } from './derive';
import type { Award, GameState, ResolveLogEntry } from './types';
import type { LifelineKey } from './theme';

/**
 * Pure state transition for awarding (or skipping) the active question.
 * Shared by the host judgment buttons and by the Fawet lifeline, which
 * resolves the question immediately as a no-score skip.
 */
export function resolveState(s: GameState, award: Award, ll: LifelineKey | null = null): GameState {
  const a = s.active;
  if (!a) return s;
  const d = derive(s.log, s.turn0);
  const doubled = !!(d.activeLL && d.activeLL.key === 'double' && award >= 0 && d.activeLL.team === award);

  const entry: ResolveLogEntry = {
    t: 'resolve',
    cat: a.cat,
    row: a.row,
    by: d.turn,
    team: award,
    amount: award < 0 ? 0 : a.row * 100 * (doubled ? 2 : 1),
    skipped: ll === 'fawet',
    ll,
  };
  const log = [...s.log, entry];
  const played = derive(log, s.turn0).played;

  let playedCount = 0;
  s.drafted.slice(0, 6).forEach((id) => {
    for (let r = 1; r <= 6; r++) if (played[`${id}-${r}`]) playedCount++;
  });

  return {
    ...s,
    log,
    active: null,
    hover: null,
    frozen: null,
    phoneUntil: 0,
    pausedLeft: 0,
    phase: playedCount >= 36 ? 'final' : 'board',
  };
}
