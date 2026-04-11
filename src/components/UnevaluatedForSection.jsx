import { memo, useMemo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import { getUnevaluatedBySection } from '../utils/unevaluated';
import RichNoteField from './RichNoteField';
import EvalRow from './EvalRow';

/**
 * Renders unevaluated questions for a specific Zweit section.
 * Used by SectionRenderer to embed open questions in their thematic context.
 */
const UnevaluatedForSection = memo(({ sectionId, erst, dispatch, currentState }) => {
  const unevaluated = useMemo(() => {
    const grouped = getUnevaluatedBySection(erst.ratings || {});
    return grouped[sectionId] || [];
  }, [erst.ratings, sectionId]);

  if (unevaluated.length === 0) return null;

  return (
    <div style={{ marginBottom: theme.spacing.md, padding: theme.spacing.md, borderRadius: theme.radius.lg, background: theme.colors.warning.bg, border: `1px solid ${theme.colors.warning.border}` }}>
      <div style={{ fontSize: theme.font.sm, fontWeight: 700, color: theme.colors.warning.text, marginBottom: theme.spacing.sm }}>
        Offene Fragen aus dem Erstgespräch
      </div>

      {unevaluated.map(({ question, sectionMain, hasEvals }) => (
        <div key={question.id} style={{ ...shared.card, marginBottom: theme.spacing.sm, background: '#fff' }}>
          <div style={{ fontSize: theme.font.xs, fontWeight: 600, color: theme.colors.text.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {sectionMain}
          </div>
          <div style={{ fontSize: theme.font.md, lineHeight: 1.8, color: theme.colors.text.primary, fontWeight: 450 }}>
            {question.text}
          </div>
          {question.followUp && (
            <div style={{ fontSize: theme.font.body, color: theme.colors.text.secondary, marginTop: 6, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2px solid ${theme.colors.border.glass}` }}>
              {question.followUp}
            </div>
          )}

          {erst.notes[question.id] && (
            <div style={{ marginTop: theme.spacing.sm, padding: '8px 14px', borderRadius: theme.radius.md, background: theme.colors.info.bg, fontSize: theme.font.sm, color: theme.colors.info.text, lineHeight: 1.6, border: `1px solid ${theme.colors.info.border}` }}>
              <span style={{ fontWeight: 700 }}>Notizen EG:</span>{' '}
              <span dangerouslySetInnerHTML={{ __html: erst.notes[question.id] }} />
            </div>
          )}

          <RichNoteField
            value={currentState.notes[question.id] || ''}
            onChange={(val) => dispatch(actions.setNote(question.id, val))}
            placeholder="Notizen (Zweitgespräch) ..."
          />

          {hasEvals && question.evaluations?.map((evaluation, evalIdx) => {
            const er = (erst.ratings[question.id] || {})[evalIdx];
            return (
              <EvalRow
                key={evalIdx}
                evaluation={evaluation}
                rating={(currentState.ratings[question.id] || {})[evalIdx]}
                erstRating={er}
                onRate={(v) => dispatch(actions.setRating(question.id, evalIdx, v))}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

UnevaluatedForSection.displayName = 'UnevaluatedForSection';
export default UnevaluatedForSection;
