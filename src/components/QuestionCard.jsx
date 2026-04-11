import { memo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';
import RichNoteField from './RichNoteField';

const QuestionCard = memo(({
  question, notes, observations, ratings, dispatch,
  erstRatings, erstNote, isZweit, hasBlockEvaluation,
}) => {
  return (
    <div
      style={{
        ...shared.card,
        marginBottom: theme.spacing.sm + 4,
        transition: `all ${theme.transition.normal}`,
      }}
      className="q-card"
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: theme.font.md, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: theme.colors.text.primary, fontWeight: 450 }}>
            {question.text}
          </div>
          {question.followUp && (
            <div style={{ fontSize: theme.font.body, color: theme.colors.text.secondary, marginTop: 8, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2px solid ${theme.colors.border.glass}` }}>
              {question.followUp}
            </div>
          )}
        </div>
      </div>

      {question.checks && (
        <div style={{ margin: `${theme.spacing.sm + 4}px 0 4px 0`, display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 16px', background: theme.colors.bg.muted, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border.subtle}` }}>
          {question.checks.map((checkText, i) => (
            <label key={i} style={{ fontSize: theme.font.body, color: theme.colors.text.secondary, display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer', lineHeight: 1.6 }}>
              <input type="checkbox" checked={!!(observations[question.id] || {})[i]} onChange={() => dispatch(actions.toggleObservation(question.id, i))} style={{ marginTop: 3, accentColor: theme.colors.accent.indigo }} />
              <span>{checkText}</span>
            </label>
          ))}
        </div>
      )}

      {isZweit && erstNote && (
        <div style={{ marginTop: theme.spacing.sm + 4, padding: '12px 16px', borderRadius: theme.radius.md, background: theme.colors.info.bg, fontSize: theme.font.sm, color: theme.colors.info.text, lineHeight: 1.7, border: `1px solid ${theme.colors.info.border}` }}>
          <span style={{ fontWeight: 700 }}>Notizen EG:</span> {erstNote}
        </div>
      )}

      <RichNoteField
        value={notes[question.id] || ''}
        onChange={(val) => dispatch(actions.setNote(question.id, val))}
        placeholder="Notizen ..."
      />

      {/* Individual evaluations (hidden when block-level evaluation is used) */}
      {!hasBlockEvaluation && question.evaluations?.map((evaluation, evalIdx) => {
        const er = erstRatings ? (erstRatings[question.id] || {})[evalIdx] : undefined;
        return (
          <EvalRow key={evalIdx} evaluation={evaluation} rating={(ratings[question.id] || {})[evalIdx]} erstRating={er} onRate={(v) => dispatch(actions.setRating(question.id, evalIdx, v))} />
        );
      })}
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';
export default QuestionCard;
