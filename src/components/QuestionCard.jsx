import { memo, useCallback } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';
import RichNoteField from './RichNoteField';

const QuestionCard = memo(({
  question, checks, notes, observations, ratings, dispatch,
  greyed, erstRatings, hideCheck, erstNote, isZweit,
}) => {
  const isChecked = !!checks[question.id];
  const handleToggleCheck = useCallback(() => dispatch(actions.toggleCheck(question.id)), [dispatch, question.id]);
  return (
    <div
      style={{
        ...shared.card,
        border: isChecked ? `1px solid ${theme.colors.accent.indigo}50` : `1px solid ${theme.colors.border.glass}`,
        marginBottom: theme.spacing.sm + 4,
        opacity: greyed ? 0.45 : 1,
        boxShadow: isChecked ? `${theme.shadow.card}, 0 0 24px ${theme.colors.accent.indigoGlow}` : theme.shadow.card,
        transition: `all ${theme.transition.normal}`,
      }}
      className="q-card"
    >
      {greyed && (
        <div style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, marginBottom: theme.spacing.sm, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: theme.colors.success.badge }}>&#10003;</span> Im Erstgespräch gestellt
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {!hideCheck && (
          <input type="checkbox" checked={isChecked} onChange={handleToggleCheck} style={{ ...shared.checkbox, marginTop: 4 }} aria-label="Frage gestellt" />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: theme.font.md, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: theme.colors.text.primary, fontWeight: 450 }}>
            {question.text}
          </div>
          {question.followUp && (
            <div style={{ fontSize: theme.font.body, color: theme.colors.accent.indigoMid, marginTop: 8, fontStyle: 'italic', lineHeight: 1.6, paddingLeft: 14, borderLeft: `2px solid ${theme.colors.accent.indigo}40` }}>
              {question.followUp}
            </div>
          )}
        </div>
      </div>

      {question.checks && (
        <div style={{ margin: `${theme.spacing.sm + 4}px 0 4px 30px`, display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border.subtle}` }}>
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

      {question.evaluations?.map((evaluation, evalIdx) => {
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
