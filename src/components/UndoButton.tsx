/**
 * Undo, as an actual button on every screen that offers it.
 *
 * The label stays `↶ Undo` whether or not there is anything to undo — a control
 * that swaps its text for a sentence stops reading as a control. Only colour and
 * border weight change when it is disabled, so the shape holds its place.
 */
export function UndoButton({ canUndo, onUndo, height = 38 }: { canUndo: boolean; onUndo: () => void; height?: number }) {
  return (
    <button
      type="button"
      disabled={!canUndo}
      onClick={onUndo}
      title={canUndo ? 'Undo the last move' : 'Nothing to undo yet'}
      style={{
        height,
        boxSizing: 'border-box',
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
        // The UA button defaults would fight the Warm Archive block styling.
        appearance: 'none',
        borderRadius: 0,
        background: canUndo ? '#f6f4ef' : 'transparent',
        border: `1px solid rgba(30,27,24,${canUndo ? '.32' : '.14'})`,
        font: "500 10px 'IBM Plex Mono', monospace",
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        color: canUndo ? '#7d7365' : '#c4bdb0',
        cursor: canUndo ? 'pointer' : 'not-allowed',
        transition: 'background .2s ease, border-color .2s ease, color .2s ease',
      }}
    >
      ↶ Undo
    </button>
  );
}
