import type { ReactNode } from 'react';

/**
 * The masthead every screen shares: the SAHRA wordmark, its tagline, a hairline
 * rule, then whatever that screen wants to say for itself (`Played 04 / 36`,
 * `Team sheet`, and so on) passed as children.
 */
export function HeaderMark({ children }: { children?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontVariationSettings: "'wdth' 112",
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 0.82,
            letterSpacing: '-.01em',
          }}
        >
          SAHRA
        </div>
        <div
          style={{
            font: "500 10px 'IBM Plex Mono', monospace",
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: '#9c9284',
          }}
        >
          a family trivia night
        </div>
      </div>
      <div style={{ width: 1, height: 20, background: 'rgba(30,27,24,.3)' }} />
      {children}
    </div>
  );
}
