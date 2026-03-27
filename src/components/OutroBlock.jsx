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

/** Outro text block with follow-up note fields (Erstgespräch only) */
const OutroBlock = memo(({ isZweit, kandidat, abschlussNotes, dispatch }) => {
  const text = isZweit ? OUTRO_ZWEIT : makeOutroErst(kandidat);

  return (
    <div style={{ ...shared.card, marginBottom: theme.spacing.sm }}>
      <div style={{ fontSize: theme.font.body, fontWeight: 600, marginBottom: theme.spacing.xs }}>
        Abschlusstext:
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: theme.font.body,
          lineHeight: 1.7,
          color: theme.colors.text.secondary,
        }}
      >
        {text}
      </div>
      {!isZweit && (
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {ABSCHLUSS_FIELDS.map((field) => (
            <div key={field}>
              <div style={{ fontSize: theme.font.xs, fontWeight: 600, color: '#64748b', marginBottom: 1 }}>
                {field}:
              </div>
              <textarea
                rows={1}
                value={abschlussNotes[field] || ''}
                onChange={(e) => dispatch(actions.setAbschlussNote(field, e.target.value))}
                style={{
                  ...shared.dashedInput,
                  padding: '3px 7px',
                  borderRadius: 4,
                  fontSize: theme.font.sm,
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
