import type { CSSProperties } from 'react';
import { INK, PAPER, TEAM_C } from '../game/theme';

export type CouponMode = 'ok' | 'active' | 'spent' | 'locked';

interface CouponProps {
  teamIndex: 0 | 1;
  label: string;
  mode: CouponMode;
  onClick?: () => void;
}

/**
 * A lifeline token — a small owned ticket, not a button. Available (paper,
 * team-coloured rail), active (filled with the team colour while in play),
 * spent (greyed with a struck label — a punched trace, not a hidden state),
 * or locked (dashed, unusable because another lifeline is already active on
 * this question).
 */
export function Coupon({ teamIndex, label, mode, onClick }: CouponProps) {
  const c = TEAM_C[teamIndex];
  const isSpent = mode === 'spent';
  const isLocked = mode === 'locked';
  const isActive = mode === 'active';
  const clickable = mode === 'ok' && !!onClick;

  const style: CSSProperties = {
    width: 96,
    height: 38,
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isActive ? c : isSpent ? '#f0eee8' : isLocked ? '#f6f4ef' : PAPER,
    border: isActive
      ? `1px solid ${c}`
      : isSpent
        ? '1px solid rgba(30,27,24,.16)'
        : isLocked
          ? '1px dashed rgba(30,27,24,.22)'
          : '1px solid rgba(30,27,24,.5)',
    transition: 'transform .22s ease, background .22s ease, border-color .22s ease',
    cursor: clickable ? 'pointer' : 'default',
  };

  const railStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    background: isActive ? 'rgba(255,255,255,.85)' : isSpent ? 'rgba(30,27,24,.12)' : isLocked ? 'rgba(30,27,24,.14)' : c,
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'Archivo, sans-serif',
    fontWeight: 700,
    fontSize: 11.5,
    lineHeight: 1,
    letterSpacing: '.04em',
    paddingLeft: 7,
    color: isActive ? '#fff' : isSpent ? '#a8a094' : isLocked ? '#bdb6a8' : INK,
    textDecoration: isSpent ? 'line-through' : 'none',
    textDecorationThickness: isSpent ? '1px' : undefined,
  };

  return (
    <div style={style} onClick={clickable ? onClick : undefined}>
      <div style={railStyle} />
      <span style={labelStyle}>{label}</span>
    </div>
  );
}
