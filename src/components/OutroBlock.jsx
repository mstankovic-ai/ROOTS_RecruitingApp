import { memo } from 'react';
import { theme, shared } from '../theme';
import { makeOutroErst, OUTRO_ZWEIT } from '../data/templates';
import { actions } from '../hooks/useInterviewState';

const ABSCHLUSS_FIELDS = [
  'Erwartungen 12 Mon.',
  'Arbeitsaufwand',
  'Reisetätigkeit',
  'Home Office',
  'Einstiegsdatum',
  'Gehaltswunsch',
];

const OutroBlock = memo(({ isZweit, kandidat, abschlussNotes, dispatch }) => {
  const text = isZweit ? OUTRO_ZWEIT : makeOutroErst(kandidat);

  return (
    <div style={{ ...shared.card, marginBottom: theme.spacing.sm + 4 }}>
      <div
        style={{
          fontSize: theme.font.xs,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: theme.colors.text.muted,
          marginBottom: theme.spacing.sm,
        }}
      >
        Abschlusstext
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: theme.font.body,
          lineHeight: 1.8,
          color: theme.colors.text.secondary,
        }}
      >
        {text}
      </div>
      {!isZweit && (
        <div
          style={{
            marginTop: theme.spacing.md,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: theme.spacing.sm + 4,
            padding: theme.spacing.md,
            background: theme.colors.bg.muted,
            borderRadius: theme.radius.md,
          }}
        >
          {ABSCHLUSS_FIELDS.map((field) => (
            <div key={field}>
              <div
                style={{
                  fontSize: theme.font.xs,
                  fontWeight: 600,
                  color: theme.colors.text.muted,
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {field}
              </div>
              <textarea
                rows={1}
                value={abschlussNotes[field] || ''}
                onChange={(e) => dispatch(actions.setAbschlussNote(field, e.target.value))}
                style={{
                  ...shared.dashedInput,
                  padding: '8px 12px',
                  fontSize: theme.font.sm,
                  background: theme.colors.bg.card,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

OutroBlock.displayName = 'OutroBlock';
export default OutroBlock;
