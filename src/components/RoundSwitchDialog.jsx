import { memo } from 'react';
import { theme } from '../theme';

/** Confirmation dialog when switching from Erst- to Zweitgespräch */
const RoundSwitchDialog = memo(({ onConfirm, onCancel }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}
    onClick={onCancel}
    role="dialog"
    aria-modal="true"
    aria-label="Rundenwechsel bestätigen"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: theme.colors.bg.card,
        borderRadius: theme.radius.xl,
        padding: 24,
        maxWidth: 420,
        width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,.2)',
      }}
    >
      <div style={{ fontSize: theme.font.xl, fontWeight: 700, marginBottom: theme.spacing.sm }}>
        Zum Zweitgespräch wechseln?
      </div>
      <div style={{ fontSize: theme.font.md, color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: theme.spacing.lg }}>
        Die Ansicht wechselt zum Zweitgespräch. Ist das Erstgespräch abgeschlossen?
        Bewertungen und Notizen des Erstgesprächs bleiben erhalten.
      </div>
      <div style={{ display: 'flex', gap: theme.spacing.sm, justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 18px',
            borderRadius: theme.radius.md,
            border: `1.5px solid ${theme.colors.border.default}`,
            background: theme.colors.bg.card,
            color: theme.colors.text.secondary,
            fontSize: theme.font.md,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Abbrechen
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: '8px 18px',
            borderRadius: theme.radius.md,
            border: 'none',
            background: theme.colors.bg.header,
            color: theme.colors.text.white,
            fontSize: theme.font.md,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Ja, wechseln
        </button>
      </div>
    </div>
  </div>
));

RoundSwitchDialog.displayName = 'RoundSwitchDialog';
export default RoundSwitchDialog;
