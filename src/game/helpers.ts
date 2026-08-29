import type { GameState, TeamIndex } from './types';

export function teamName(state: GameState, ti: TeamIndex): string {
  const n = state.teams[ti].name.trim();
  return n || (ti === 0 ? 'Team One' : 'Team Two');
}

export function roster(state: GameState, ti: TeamIndex): string {
  const names = state.teams[ti].members.map((m) => m.trim()).filter(Boolean);
  return names.length ? names.join(' · ') : 'No names given';
}

export function turnOf(state: GameState, currentTurn: TeamIndex): TeamIndex {
  return state.phase === 'draft' ? ((state.drafted.length % 2) as TeamIndex) : currentTurn;
}
