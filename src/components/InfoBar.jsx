import { memo } from 'react';
import { theme } from '../theme';

const InfoBar = memo(({ isZweit, onShowErstScript }) => {
  // Only show InfoBar in Zweitgespräch (for the "Erstgespräch einsehen" button)
  if (!isZweit) return null;

  return (
    <div
      style={{
        background: theme.colors.info.bg,
        padding: '14px 32px 14px 252px',
        fontSize: theme.font.body,
        color: theme.colors.info.text,
        lineHeight: 1.7,
        borderBottom: `1px solid ${theme.colors.info.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
      className="no-print"
    >
      <div style={{ flex: 1 }}>
        Nicht bewertete Fragen aus dem Erstgespräch erscheinen oben automatisch.
      </div>
      {onShowErstScript && (
        <button
          onClick={onShowErstScript}
          style={{
            padding: '6px 14px',
            borderRadius: theme.radius.sm,
            border: `1px solid ${theme.colors.accent.indigo}30`,
            background: theme.colors.accent.indigoLight,
            color: theme.colors.accent.indigo,
            fontSize: theme.font.sm,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: `all ${theme.transition.fast}`,
          }}
        >
          Erstgespräch einsehen
        </button>
      )}
    </div>
  );
});

InfoBar.displayName = 'InfoBar';
export default InfoBar;
