import { INK, PAPER, TEAM_C, fmt } from '../game/theme';
import type { DerivedGame, TeamIndex } from '../game/types';
import { HoverButton } from './HoverButton';

interface FinalScreenProps {
  drafted: string[];
  derived: DerivedGame;
  teamName: (ti: TeamIndex) => string;
  roster: (ti: TeamIndex) => string;
  onRematch: () => void;
  onNewPacks: () => void;
}

export function FinalScreen({ drafted, derived, teamName, roster, onRematch, onNewPacks }: FinalScreenProps) {
  const cols = drafted.slice(0, 6);
  let playedCount = 0;
  cols.forEach((id) => {
    for (let r = 1; r <= 6; r++) if (derived.played[`${id}-${r}`]) playedCount++;
  });

  const [s0, s1] = derived.scores;
  const draw = s0 === s1;
  const win: TeamIndex = s0 > s1 ? 0 : 1;
  const finalTitle = draw ? 'A draw, so nobody clears the table' : teamName(win);
  const finalSize = finalTitle.length > 16 ? 84 : 118;
  const finalInk = draw ? INK : TEAM_C[win];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '44px 56px 38px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        animation: 'sahraFade .4s ease both',
      }}
    >
      <div style={{ borderTop: `2px solid ${INK}`, paddingTop: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ font: "500 10.5px 'IBM Plex Mono', monospace", letterSpacing: '.2em', textTransform: 'uppercase', color: '#7d7365' }}>Sahra / Family edition</div>
        <div style={{ font: "500 10.5px 'IBM Plex Mono', monospace", letterSpacing: '.2em', textTransform: 'uppercase', color: '#7d7365' }}>
          Played {playedCount} of 36 · {drafted.length} categories
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ font: "500 10.5px 'IBM Plex Mono', monospace", letterSpacing: '.2em', textTransform: 'uppercase', color: '#8c8376' }}>
            {draw ? 'It ends level' : 'Tonight goes to'}
          </div>
          <div
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontVariationSettings: "'wdth' 112",
              fontWeight: 700,
              fontSize: finalSize,
              lineHeight: 0.86,
              letterSpacing: '-.02em',
              maxWidth: 760,
              textTransform: 'uppercase',
              color: finalInk,
            }}
          >
            {finalTitle}
          </div>
        </div>
        <div
          style={{
            width: 150,
            height: 150,
            flex: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: 14,
            border: `3px solid ${finalInk}`,
            outline: `1px solid ${finalInk}`,
            outlineOffset: 5,
            transform: 'rotate(-2deg)',
            opacity: 0.9,
            animation: 'sahraStamp .45s ease .15s both',
          }}
        >
          <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '.18em', textTransform: 'uppercase', color: finalInk, textAlign: 'center', lineHeight: 1.5 }}>
            {draw ? 'Draw' : 'Winner'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ borderTop: `2px solid ${INK}`, paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 36 }}>
          {([0, 1] as TeamIndex[]).map((ti) => (
            <div key={`final-${ti}`} style={{ display: 'contents' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 20,
                  flexDirection: ti === 0 ? 'row-reverse' : 'row',
                  textAlign: ti === 1 ? 'right' : 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ width: 16, height: 16, flex: 'none', background: TEAM_C[ti] }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '.09em', textTransform: 'uppercase', color: '#5c5449', whiteSpace: 'nowrap' }}>
                      {teamName(ti)}
                    </div>
                    <div style={{ font: "500 12px 'IBM Plex Mono', monospace", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8a8175' }}>{roster(ti)}</div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontVariationSettings: "'wdth' 112",
                    fontWeight: 700,
                    fontSize: 66,
                    lineHeight: 0.86,
                    letterSpacing: '-.01em',
                    color: !draw && win === ti ? TEAM_C[ti] : '#8c8376',
                  }}
                >
                  {fmt(derived.scores[ti])}
                </div>
              </div>
              {ti === 0 && <div style={{ width: 1, background: 'repeating-linear-gradient(180deg, #cfc9bd 0 4px, transparent 4px 8px)' }} />}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ font: "500 10px 'IBM Plex Mono', monospace", letterSpacing: '.16em', lineHeight: 1.9, textTransform: 'uppercase', color: '#a8a094' }}>
            The board rests until you want it again
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <HoverButton bg={PAPER} hoverBg="#f1eee5" border="1.5px solid rgba(30,27,24,.5)" height={50} onClick={onRematch}>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: INK }}>
                Rematch, same teams
              </span>
            </HoverButton>
            <HoverButton bg={INK} hoverBg="#332e28" height={50} onClick={onNewPacks}>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '.08em', textTransform: 'uppercase', color: '#f8f6f1' }}>New packs</span>
            </HoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}
