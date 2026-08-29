import { Fragment, type CSSProperties } from 'react';
import { byId } from '../game/pool';
import { INK, LIFELINES, PLAYED_FILL, TEAM_C, catInk, fmt } from '../game/theme';
import { benchLifelineMode } from '../game/lifelines';
import type { DerivedGame, TeamIndex } from '../game/types';
import { Coupon } from './Coupon';

interface BoardScreenProps {
  drafted: string[];
  derived: DerivedGame;
  turn: TeamIndex;
  hover: string | null;
  canUndo: boolean;
  teamName: (ti: TeamIndex) => string;
  roster: (ti: TeamIndex) => string;
  onHover: (key: string | null) => void;
  onPick: (cat: string, row: number) => void;
  onEndGame: () => void;
  onUndo: () => void;
}

const headerLabel: CSSProperties = {
  font: "500 10px 'IBM Plex Mono', monospace",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: '#7d7365',
};

export function BoardScreen({
  drafted,
  derived,
  turn,
  hover,
  canUndo,
  teamName,
  roster,
  onHover,
  onPick,
  onEndGame,
  onUndo,
}: BoardScreenProps) {
  const cols = drafted.slice(0, 6);
  let playedCount = 0;
  cols.forEach((id) => {
    for (let r = 1; r <= 6; r++) if (derived.played[`${id}-${r}`]) playedCount++;
  });
  const nameLen = Math.max(teamName(0).length, teamName(1).length);
  const turnPlateSize = nameLen > 14 ? 34 : nameLen > 10 ? 42 : 50;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        animation: 'sahraFade .3s ease both',
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
          <div style={{ ...headerLabel, paddingBottom: 2 }}>Played {String(playedCount).padStart(2, '0')} / 36</div>
          <div
            onClick={onEndGame}
            style={{
              cursor: 'pointer',
              minHeight: 34,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 10px 2px',
              font: "500 12px 'IBM Plex Mono', monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: '#7d7365',
              borderBottom: '1px solid rgba(30,27,24,.3)',
            }}
          >
            End game
          </div>
          <div
            onClick={canUndo ? onUndo : undefined}
            style={{
              minHeight: 34,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 10px 2px',
              font: "500 12px 'IBM Plex Mono', monospace",
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: canUndo ? '#7d7365' : '#c4bdb0',
              borderBottom: `1px solid rgba(30,27,24,${canUndo ? '.3' : '.12'})`,
              cursor: canUndo ? 'pointer' : 'default',
            }}
          >
            {canUndo ? '↶ Undo' : 'Nothing to undo'}
          </div>
        </div>
        <div
          style={{
            height: 76,
            padding: '0 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            background: TEAM_C[turn],
            marginBottom: -2,
            transition: 'background .3s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontVariationSettings: "'wdth' 112",
              fontWeight: 700,
              fontSize: turnPlateSize,
              lineHeight: 1,
              letterSpacing: '-.005em',
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
              fontSize: 15,
              lineHeight: 1.25,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.82)',
              maxWidth: 52,
            }}
          >
            to pick
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {cols.map((id) => {
          const cat = byId(id);
          const ci = catInk(id);
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  height: 44,
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                  background: ci.c,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: 1,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {cat.title}
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[1, 2, 3, 4, 5, 6].map((r) => {
                  const key = `${id}-${r}`;
                  const mark = derived.played[key];
                  const played = !!mark;
                  const skipped = mark === 'skip';
                  const hot = hover === key && !played;
                  return (
                    <div
                      key={r}
                      onClick={played ? undefined : () => onPick(id, r)}
                      onMouseEnter={played ? undefined : () => onHover(key)}
                      onMouseLeave={played ? undefined : () => onHover(null)}
                      style={{
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background .2s ease, border-color .2s ease',
                        background: skipped
                          ? 'repeating-linear-gradient(135deg, #efece4 0 5px, #e5e1d7 5px 10px)'
                          : played
                            ? PLAYED_FILL
                            : ci.tint,
                        border: played
                          ? skipped
                            ? '1px dashed rgba(30,27,24,.2)'
                            : '1px solid rgba(30,27,24,.07)'
                          : hot
                            ? `2px solid ${ci.c}`
                            : `1px solid ${ci.c}`,
                        cursor: played ? 'default' : 'pointer',
                      }}
                    >
                      {played && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-8%',
                            right: '-8%',
                            top: '50%',
                            height: 24,
                            transform: 'translateY(-50%) rotate(-4deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: skipped ? '#8c8376' : `color-mix(in srgb, ${ci.c} 52%, ${PLAYED_FILL})`,
                          }}
                        >
                          <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: '.18em', color: '#f8f6f1' }}>
                            {skipped ? 'FAWET' : 'PLAYED'}
                          </span>
                        </div>
                      )}
                      {!played && (
                        <span style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 34, lineHeight: 1, color: ci.num }}>
                          {r * 100}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: `2px solid ${INK}`, paddingTop: 16, display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 24 }}>
        {([0, 1] as TeamIndex[]).map((ti) => (
          <Fragment key={`bench-${ti}`}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 20,
                flexDirection: ti === 1 ? 'row-reverse' : 'row',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: ti === 1 ? 'flex-end' : 'flex-start', textAlign: ti === 1 ? 'right' : 'left' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <div style={{ width: 14, height: 14, flex: 'none', background: TEAM_C[ti] }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1, letterSpacing: '.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#5c5449' }}>
                      {teamName(ti)}
                    </div>
                    <div style={{ font: "500 12px 'IBM Plex Mono', monospace", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8a8175', whiteSpace: 'nowrap' }}>
                      {roster(ti)}
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 36, lineHeight: 0.9, letterSpacing: '-.005em' }}>
                  {fmt(derived.scores[ti])}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                {LIFELINES.map((l) => (
                  <Coupon key={l.key} teamIndex={ti} label={l.label} mode={benchLifelineMode(derived, ti, l.key)} />
                ))}
              </div>
            </div>
            {ti === 0 && <div style={{ width: 1, background: 'repeating-linear-gradient(180deg, #cfc9bd 0 4px, transparent 4px 8px)' }} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
