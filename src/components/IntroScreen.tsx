import type { CSSProperties } from 'react';
import { introGeometry } from '../game/intro';
import { INK } from '../game/theme';

interface IntroScreenProps {
  t: number;
  onSkip: () => void;
}

export function IntroScreen({ t, onSkip }: IntroScreenProps) {
  const g = introGeometry(t);

  const lineBase: CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: g.lineWidth,
    height: 3,
    background: INK,
    opacity: g.lineOpacity,
  };

  const wordStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    top: g.wordTop,
    transformOrigin: `50% ${g.wordOriginY}px`,
    transform: `translateY(${-g.wordOriginY}px) scaleY(${g.wordScaleY})`,
    opacity: g.wordOpacity,
    visibility: g.wordVisible ? 'visible' : 'hidden',
  };

  const skipStyle: CSSProperties = {
    position: 'absolute',
    right: 32,
    bottom: 26,
    cursor: 'pointer',
    transition: 'opacity .3s ease',
    opacity: g.skipVisible ? 1 : 0,
    pointerEvents: g.skipVisible ? 'auto' : 'none',
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <div style={{ ...lineBase, top: g.topLineTop }} />
      <div style={{ ...lineBase, top: g.bottomLineTop }} />
      <div style={wordStyle}>
        <div
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontVariationSettings: "'wdth' 112",
            fontWeight: 700,
            fontSize: 224,
            lineHeight: 0.8,
            letterSpacing: '-.02em',
            color: INK,
          }}
        >
          SAHRA
        </div>
      </div>
      <div style={skipStyle} onClick={onSkip}>
        <span
          style={{
            font: "500 10px 'IBM Plex Mono', monospace",
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: '#8a8175',
            borderBottom: '1px solid rgba(30,27,24,.25)',
          }}
        >
          Skip →
        </span>
      </div>
    </div>
  );
}
