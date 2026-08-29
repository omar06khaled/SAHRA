import type { CSSProperties, ReactNode } from 'react';
import { PAPER, INK } from '../game/theme';

const grainSvg =
  "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url%28%23n%29'/%3E%3C/svg%3E)";

const stageStyle: CSSProperties = {
  width: 1280,
  height: 720,
  position: 'relative',
  overflow: 'hidden',
  background: PAPER,
  color: INK,
  boxSizing: 'border-box',
};

const grainStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 3,
  opacity: 0.12,
  mixBlendMode: 'multiply',
  filter: 'grayscale(1) contrast(1.15)',
  backgroundImage: grainSvg,
  backgroundSize: '160px 160px',
};

const scanlineStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 2,
  opacity: 0.26,
  background: 'repeating-linear-gradient(0deg, rgba(30,27,24,.03) 0 1px, transparent 1px 3px)',
};

export function Stage({ children }: { children: ReactNode }) {
  return (
    <div style={stageStyle} data-testid="stage">
      <div style={grainStyle} />
      <div style={scanlineStyle} />
      {children}
    </div>
  );
}
