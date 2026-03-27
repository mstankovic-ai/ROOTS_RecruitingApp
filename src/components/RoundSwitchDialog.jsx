import { memo } from 'react';
import { theme } from '../theme';

const RoundSwitchDialog = memo(({ onConfirm, onCancel }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(4px)',
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
        padding: 32,
        maxWidth: 440,
        width: '90%',
        boxShadow: theme.shadow.xl,
        border: `1px solid ${theme.colors.border.default}`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: theme.radius.md,
          background: theme.colors.info.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          marginBottom: theme.spacing.md,
        }}
      >
        &#8644;
      </div>
      <div style={{ fontSize: theme.font.xl, fontWeight: 700, marginBottom: theme.spacing.sm, color: theme.colors.text.primary }}>
        Zum Zweitgespräch wechseln?
      </div>
      <div style={{ fontSize: theme.font.md, color: theme.colors.text.secondary, lineHeight: 1.7, marginBottom: theme.spacing.lg }}>
        Die Ansicht wechselt zum Zweitgespräch. Ist das Erstgespräch abgeschlossen?
        Bewertungen und Notizen des Erstgesprächs bleiben erhalten.
      </div>
      <div style={{ display: 'flex', gap: theme.spacing.sm + 4, justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 22px',
            borderRadius: theme.radius.md,
            border: `1.5px solid ${theme.colors.border.default}`,
            background: theme.colors.bg.card,
            color: theme.colors.text.secondary,
            fontSize: theme.font.md,
            fontWeight: 600,
            cursor: 'pointer',
            transition: `all ${theme.transition.fast}`,
          }}
        >
          Abbrechen
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: '10px 22px',
            borderRadius: theme.radius.md,
            border: 'none',
            background: theme.colors.accent.indigo,
            color: theme.colors.text.white,
            fontSize: theme.font.md,
            fontWeight: 600,
            cursor: 'pointer',
            transition: `all ${theme.transition.fast}`,
            boxShadow: `0 2px 8px ${theme.colors.accent.indigo}40`,
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
