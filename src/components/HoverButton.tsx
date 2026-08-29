import type { ReactNode } from 'react';

interface HoverButtonProps {
  bg: string;
  hoverBg: string;
  border?: string;
  height?: number;
  padding?: string;
  onClick: () => void;
  children: ReactNode;
}

/** A block action button whose background swaps on hover — no shadow, no gradient, no rounded pill. */
export function HoverButton({ bg, hoverBg, border, height = 52, padding = '0 24px', onClick, children }: HoverButtonProps) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = bg)}
      style={{
        cursor: 'pointer',
        height,
        padding,
        display: 'flex',
        alignItems: 'center',
        background: bg,
        border,
        transition: 'background .25s ease',
      }}
    >
      {children}
    </div>
  );
}
