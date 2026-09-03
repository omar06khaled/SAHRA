import type { GameState, TeamIndex } from './types';

export function teamName(state: GameState, ti: TeamIndex): string {
  const n = state.teams[ti].name.trim();
  return n || (ti === 0 ? 'Team One' : 'Team Two');
}

export function roster(state: GameState, ti: TeamIndex): string {
  const names = rosterNames(state, ti);
  return names.length ? names.join(' · ') : 'No names given';
}

/**
 * The filled-in member names, unjoined — for screens that render each player as
 * its own element and need a real empty state rather than a placeholder string.
 */
export function rosterNames(state: GameState, ti: TeamIndex): string[] {
  return state.teams[ti].members.map((m) => m.trim()).filter(Boolean);
}

export function turnOf(state: GameState, currentTurn: TeamIndex): TeamIndex {
  return state.phase === 'draft' ? ((state.drafted.length % 2) as TeamIndex) : currentTurn;
}
