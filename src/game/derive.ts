import type { DerivedGame, LogEntry, TeamIndex } from './types';
import type { LifelineKey } from './theme';

/**
 * Scores, spent lifelines, played tiles and whose turn it is are never stored
 * directly — they're all derived from the append-only log. That's what makes
 * undo a plain "drop the last entry" instead of a parallel set of special cases.
 */
export function derive(log: LogEntry[], turn0: number): DerivedGame {
  const scores: [number, number] = [0, 0];
  const spent: [Record<LifelineKey, boolean>, Record<LifelineKey, boolean>] = [
    {} as Record<LifelineKey, boolean>,
    {} as Record<LifelineKey, boolean>,
  ];
  const played: Record<string, 'play' | 'skip'> = {};
  let resolves = 0;

  for (const e of log) {
    if (e.t === 'll') {
      spent[e.team][e.key] = true;
      continue;
    }
    resolves++;
    played[`${e.cat}-${e.row}`] = e.skipped ? 'skip' : 'play';
    if (e.ll) spent[e.by][e.ll] = true;
    if (e.team >= 0) scores[e.team as TeamIndex] += e.amount;
  }

  let activeLL = null;
  for (let i = log.length - 1; i >= 0; i--) {
    const e = log[i];
    if (e.t !== 'll') break;
    activeLL = e;
  }

  const turn = ((turn0 + resolves) % 2) as TeamIndex;
  return { scores, spent, played, resolves, activeLL, turn };
}
