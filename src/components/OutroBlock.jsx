import { memo } from 'react';
import { theme, shared } from '../theme';
import { makeOutroErst, OUTRO_ZWEIT } from '../data/templates';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';
import RichNoteField from './RichNoteField';

const OutroBlock = memo(({ isZweit, kandidat, abschlussNotes, dispatch, outroFields, outroQuestion, outroEvaluation, ratings, erstRatings }) => {
  const fields = outroFields || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm + 4 }}>
      <div style={{ ...shared.card }}>
        <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.text.muted, marginBottom: theme.spacing.sm }}>
          Abschlusstext
        </div>
        <div style={{ whiteSpace: 'pre-wrap', fontSize: theme.font.body, lineHeight: 1.8, color: theme.colors.text.secondary }}>
          {isZweit ? OUTRO_ZWEIT : makeOutroErst(kandidat)}
        </div>
        {fields.length > 0 && (
          <div style={{ marginTop: theme.spacing.lg, display: 'grid', gridTemplateColumns: fields.length > 1 ? '1fr 1fr' : '1fr', gap: theme.spacing.sm + 4, padding: theme.spacing.md, background: theme.colors.bg.muted, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border.subtle}` }}>
            {fields.map((field) => (
              <div key={field}>
                <div style={{ fontSize: theme.font.xs, fontWeight: 600, color: theme.colors.text.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{field}</div>
                <textarea rows={1} value={abschlussNotes[field] || ''} onChange={(e) => dispatch(actions.setAbschlussNote(field, e.target.value))} style={{ ...shared.dashedInput, padding: '8px 12px', fontSize: theme.font.sm }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3.5: Abschlusstest-Frage (Zweitgespräch) */}
      {outroQuestion && (
        <div style={{ ...shared.card }}>
          <div style={{ fontSize: theme.font.md, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: theme.colors.text.primary, fontWeight: 450 }}>
            {outroQuestion.text}
          </div>
          <RichNoteField
            value={(abschlussNotes['_outroQ_' + outroQuestion.id] || '')}
            onChange={(val) => dispatch(actions.setAbschlussNote('_outroQ_' + outroQuestion.id, val))}
            placeholder="Notizen ..."
          />
        </div>
      )}

      {/* 4.1: Evaluation "Qualität der Rückfrage" */}
      {outroEvaluation && outroEvaluation.evaluations.map((ev, evalIdx) => {
        const er = erstRatings ? (erstRatings[outroEvaluation.id] || {})[evalIdx] : undefined;
        return (
          <EvalRow
            key={evalIdx}
            evaluation={ev}
            rating={(ratings?.[outroEvaluation.id] || {})[evalIdx]}
            erstRating={er}
            onRate={(v) => dispatch(actions.setRating(outroEvaluation.id, evalIdx, v))}
          />
        );
      })}
    </div>
  );
});

OutroBlock.displayName = 'OutroBlock';
export default OutroBlock;
