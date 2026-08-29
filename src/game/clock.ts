import type { GameState } from './types';

/** Seconds left on the main question timer, frozen appropriately during a phone call or reveal. */
export function secondsLeft(state: GameState): number {
  if (state.phoneUntil) return state.pausedLeft || 0;
  if (state.phase === 'reveal') return state.frozen ?? 0;
  if (!state.deadline) return 0;
  return Math.max(0, Math.round((state.deadline - Date.now()) / 1000));
}

/** Seconds left on the Sa3douni (phone a friend) countdown. */
export function phoneSecondsLeft(state: GameState): number {
  return Math.max(0, Math.ceil((state.phoneUntil - Date.now()) / 1000));
}
