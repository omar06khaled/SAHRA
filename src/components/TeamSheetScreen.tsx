import type { CSSProperties } from 'react';
import { INK, PAPER, TEAM_C } from '../game/theme';
import type { Team, TeamIndex } from '../game/types';

interface TeamSheetScreenProps {
  teams: [Team, Team];
  onSetName: (ti: TeamIndex, value: string) => void;
  onSetMember: (ti: TeamIndex, mi: number, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const headerLabel: CSSProperties = {
  font: "500 10px 'IBM Plex Mono', monospace",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: '#7d7365',
};

const fieldLabel: CSSProperties = {
  font: "500 9.5px 'IBM Plex Mono', monospace",
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: '#8c8376',
};

const HINTS: [string, string] = ['El 3eila', 'Team Mango'];
const SLOT_LABELS: [string, string] = ['Team one', 'Team two'];

export function TeamSheetScreen({ teams, onSetName, onSetMember, onBack, onNext }: TeamSheetScreenProps) {
  const ready = teams.every((t) => t.name.trim().length > 0);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '34px 40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
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
          <div style={{ ...headerLabel, paddingBottom: 2 }}>Team sheet</div>
        </div>
        <div style={headerLabel}>Members optional</div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        {teams.map((team, i) => {
          const ti = i as TeamIndex;
          return (
            <div
              key={ti}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: PAPER,
                border: '1px solid rgba(30,27,24,.18)',
                boxShadow: '0 1px 0 rgba(30,27,24,.05)',
              }}
            >
              <div
                style={{
                  height: 46,
                  flex: 'none',
                  boxSizing: 'border-box',
                  padding: '0 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: TEAM_C[ti],
                }}
              >
                <span
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  {SLOT_LABELS[ti]}
                </span>
                <span
                  style={{
                    font: "500 10px 'IBM Plex Mono', monospace",
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.8)',
                  }}
                >
                  Sheet 0{ti + 1}
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  boxSizing: 'border-box',
                  padding: '22px 26px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={fieldLabel}>Team name</div>
                  <input
                    value={team.name}
                    onChange={(e) => onSetName(ti, e.target.value)}
                    placeholder={HINTS[ti]}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      border: 'none',
                      borderBottom: `2px solid ${TEAM_C[ti]}`,
                      background: 'transparent',
                      fontFamily: 'Archivo, sans-serif',
                      fontVariationSettings: "'wdth' 112",
                      fontWeight: 700,
                      fontSize: 42,
                      lineHeight: 1.1,
                      color: INK,
                      padding: '0 0 6px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={fieldLabel}>Who is playing</div>
                  {team.members.map((m, mi) => (
                    <div
                      key={mi}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderBottom: '1px solid rgba(30,27,24,.14)',
                        paddingBottom: 5,
                      }}
                    >
                      <span style={{ font: "500 10px 'IBM Plex Mono', monospace", color: '#b3aa9c', width: 14 }}>
                        {mi + 1}.
                      </span>
                      <input
                        value={m}
                        onChange={(e) => onSetMember(ti, mi, e.target.value)}
                        placeholder={mi === 0 ? 'Optional' : ''}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          fontFamily: 'Archivo, sans-serif',
                          fontWeight: 400,
                          fontSize: 19,
                          color: INK,
                          padding: '2px 0',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(30,27,24,.2)',
          paddingTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          onClick={onBack}
          style={{
            cursor: 'pointer',
            font: "500 11px 'IBM Plex Mono', monospace",
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: '#7d7365',
          }}
        >
          ← Back
        </div>
        <div
          onClick={onNext}
          style={{
            cursor: ready ? 'pointer' : 'default',
            height: 56,
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            background: ready ? INK : '#e8e4da',
            transition: 'background .25s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: ready ? '#f8f6f1' : '#b3aa9c',
            }}
          >
            Draft the categories
          </span>
        </div>
      </div>
    </div>
  );
}
