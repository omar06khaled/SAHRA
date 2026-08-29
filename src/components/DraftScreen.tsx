import type { CSSProperties } from 'react';
import { POOL, byId } from '../game/pool';
import { INK, INKS, PLAYED_FILL, TEAM_C, catInk } from '../game/theme';
import type { TeamIndex } from '../game/types';

interface DraftScreenProps {
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn: TeamIndex;
  teamName: (ti: TeamIndex) => string;
  onPick: (id: string) => void;
  onOpenBoard: () => void;
}

const headerLabel: CSSProperties = {
  font: "500 10px 'IBM Plex Mono', monospace",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: '#7d7365',
};

export function DraftScreen({ taken, drafted, turn, teamName, onPick, onOpenBoard }: DraftScreenProps) {
  const claimedCount = drafted.length;
  const poolCount = POOL.length;
  const columns = poolCount <= 6 ? 3 : poolCount <= 8 ? 4 : 5;
  const nameLen = Math.max(teamName(0).length, teamName(1).length);
  const plateSize = nameLen > 14 ? 24 : nameLen > 10 ? 29 : 34;
  const ready = claimedCount >= 6;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '24px 32px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        animation: 'sahraIn .32s ease both',
      }}
    >
      <div
        style={{
          borderBottom: `2px solid ${INK}`,
          paddingBottom: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
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
          <div style={{ width: 1, height: 20, background: 'rgba(30,27,24,.3)' }} />
          <div style={{ ...headerLabel, paddingBottom: 2 }}>
            Category draft / {claimedCount} of 6 claimed / {poolCount} on the table
          </div>
        </div>
        <div
          style={{
            height: 56,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: TEAM_C[(claimedCount % 2) as TeamIndex],
            marginBottom: -2,
            transition: 'background .3s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontVariationSettings: "'wdth' 112",
              fontWeight: 700,
              fontSize: plateSize,
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}
          >
            {teamName(turn)}
          </span>
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 1.25,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.82)',
              maxWidth: 46,
            }}
          >
            {ready ? 'ready' : 'to pick'}
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoRows: '1fr',
          gap: 9,
        }}
      >
        {POOL.map((p) => {
          const ci = INKS[p.ink];
          const owner = taken[p.id];
          const claimed = owner !== undefined;
          const shift = claimed ? (owner === 0 ? 'translateY(-3px)' : 'translateY(3px)') : 'none';
          const clickable = !claimed && claimedCount < 6;
          return (
            <div
              key={p.id}
              onClick={() => onPick(p.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxSizing: 'border-box',
                transition: 'transform .3s ease, background .3s ease, border-color .3s ease',
                transform: shift,
                background: claimed ? PLAYED_FILL : ci.tint,
                border: claimed ? `2px solid ${TEAM_C[owner]}` : `1px solid ${ci.c}`,
                cursor: clickable ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  flex: 'none',
                  minHeight: 38,
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  background: claimed ? '#c9c3b6' : ci.c,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 1.05,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#fff',
                  }}
                >
                  {p.title}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  boxSizing: 'border-box',
                  padding: '9px 12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 400, fontSize: 12.5, lineHeight: 1.3, color: '#5c5449' }}>
                  {p.sub}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderTop: claimed ? '1px solid rgba(30,27,24,.14)' : '1px solid rgba(30,27,24,.16)',
                    paddingTop: 7,
                  }}
                >
                  <div style={{ width: 9, height: 9, flex: 'none', background: claimed ? TEAM_C[owner] : ci.c, opacity: claimed ? 1 : 0.45 }} />
                  <span
                    style={{
                      fontFamily: 'Archivo, sans-serif',
                      fontWeight: 700,
                      fontSize: 11,
                      lineHeight: 1.2,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      color: claimed ? INK : '#8c8376',
                    }}
                  >
                    {claimed ? teamName(owner) : '6 questions'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          borderTop: `2px solid ${INK}`,
          paddingTop: 12,
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
          gap: 24,
          alignItems: 'center',
        }}
      >
        {([0, 1] as TeamIndex[]).map((ti) => {
          const mine = drafted.filter((id) => taken[id] === ti);
          return (
            <div
              key={ti}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                minWidth: 0,
                ...(ti === 1 ? { justifyContent: 'flex-end', flexDirection: 'row-reverse' as const } : {}),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 13, height: 13, background: TEAM_C[ti] }} />
                <span
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: '.09em',
                    textTransform: 'uppercase',
                    color: '#5c5449',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {teamName(ti)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flex: 1, minWidth: 0 }}>
                {[0, 1, 2].map((i) => {
                  const id = mine[i];
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        minWidth: 0,
                        maxWidth: 150,
                        minHeight: 34,
                        boxSizing: 'border-box',
                        padding: '5px 9px',
                        display: 'flex',
                        alignItems: 'center',
                        background: id ? catInk(id).tint : 'transparent',
                        border: `1px solid ${id ? catInk(id).c : 'rgba(30,27,24,.14)'}`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Archivo, sans-serif',
                          fontWeight: 600,
                          fontSize: 12,
                          lineHeight: 1.15,
                          letterSpacing: '.03em',
                          textTransform: 'uppercase',
                          color: id ? INK : '#c4bdb0',
                        }}
                      >
                        {id ? byId(id).title : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div
          onClick={ready ? onOpenBoard : undefined}
          style={{
            gridColumn: 2,
            gridRow: 1,
            height: 46,
            padding: '0 22px',
            display: 'flex',
            alignItems: 'center',
            background: ready ? INK : 'transparent',
            border: `1px solid ${ready ? INK : 'rgba(30,27,24,.16)'}`,
            transition: 'background .3s ease',
            cursor: ready ? 'pointer' : 'default',
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: ready ? '#f8f6f1' : '#c4bdb0',
              whiteSpace: 'nowrap',
            }}
          >
            {ready ? 'Open the board' : 'Six to claim'}
          </span>
        </div>
      </div>
    </div>
  );
}
