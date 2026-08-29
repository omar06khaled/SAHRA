import type { CouponMode } from '../components/Coupon';
import type { LifelineKey } from './theme';
import type { DerivedGame, TeamIndex } from './types';

/** How a team's lifeline token should render on the board bench. */
export function benchLifelineMode(d: DerivedGame, ti: TeamIndex, key: LifelineKey): CouponMode {
  if (d.activeLL && d.activeLL.key === key && d.activeLL.team === ti) return 'active';
  if (d.spent[ti][key]) return 'spent';
  if (d.activeLL) return 'locked';
  return 'ok';
}

/**
 * How the answering team's lifeline token should render on the question
 * screen. Only usable while the question is still open (not during reveal —
 * Double must be declared before the answer is shown) and only when no other
 * lifeline is already active on this question.
 */
export function questionLifelineMode(d: DerivedGame, turn: TeamIndex, key: LifelineKey, onQuestion: boolean): CouponMode {
  if (d.activeLL && d.activeLL.key === key && d.activeLL.team === turn) return 'active';
  if (d.spent[turn][key]) return 'spent';
  if (d.activeLL) return 'locked';
  return onQuestion ? 'ok' : 'locked';
}
