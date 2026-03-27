import { memo, useCallback } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';

/**
 * Renders a single interview question with checkbox, notes, observation checks, and eval rows.
 * Memoized to prevent re-renders when sibling questions change.
 */
const QuestionCard = memo(({
  question,
  checks,
  notes,
  observations,
  ratings,
  dispatch,
  greyed,
  erstRatings,
  hideCheck,
  erstNote,
  isZweit,
}) => {
  const isChecked = !!checks[question.id];

  const handleToggleCheck = useCallback(
    () => dispatch(actions.toggleCheck(question.id)),
    [dispatch, question.id],
  );

  const handleNoteChange = useCallback(
    (e) => dispatch(actions.setNote(question.id, e.target.value)),
    [dispatch, question.id],
  );

  return (
    <div
      style={{
        background: greyed ? theme.colors.bg.primary : theme.colors.bg.card,
        border: isChecked
          ? `1.5px solid ${theme.colors.accent.indigo}`
          : `1px solid ${theme.colors.border.default}`,
        borderRadius: theme.radius.lg,
        padding: `${theme.spacing.md - 4}px ${theme.spacing.md}px`,
        marginBottom: theme.spacing.sm,
        transition: 'all 150ms',
        opacity: greyed ? 0.55 : 1,
      }}
      className="q-card"
    >
      {greyed && (
        <div style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, marginBottom: theme.spacing.xs, fontStyle: 'italic' }}>
          &#10003; Im Erstgespräch gestellt
        </div>
      )}

      <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'flex-start' }}>
        {!hideCheck && (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleCheck}
            style={{ ...shared.checkbox, marginTop: 3 }}
            aria-label="Frage gestellt"
          />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: theme.font.md, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {question.text}
          </div>
          {question.followUp && (
            <div style={{ fontSize: theme.font.body, color: theme.colors.accent.indigo, marginTop: 3, fontStyle: 'italic' }}>
              {question.followUp}
            </div>
          )}
        </div>
      </div>

      {/* Observation checkboxes (e.g. Selbstvorstellung criteria) */}
      {question.checks && (
        <div style={{ margin: '6px 0 2px 25px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {question.checks.map((checkText, i) => (
            <label
              key={i}
              style={{
                fontSize: theme.font.body,
                color: theme.colors.text.secondary,
                display: 'flex',
                gap: 5,
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={!!(observations[question.id] || {})[i]}
                onChange={() => dispatch(actions.toggleObservation(question.id, i))}
                style={{ marginTop: 2, accentColor: theme.colors.accent.indigo }}
              />
              <span>{checkText}</span>
            </label>
          ))}
        </div>
      )}

      {/* Inherited note from Erstgespräch */}
      {isZweit && erstNote && (
        <div
          style={{
            marginTop: 6,
            padding: '5px 9px',
            borderRadius: theme.radius.sm,
            background: theme.colors.info.bg,
            fontSize: theme.font.sm,
            color: theme.colors.info.text,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 600 }}>Notizen EG:</span> {erstNote}
        </div>
      )}

      {/* Notes textarea */}
      <textarea
        placeholder="Notizen …"
        value={notes[question.id] || ''}
        onChange={handleNoteChange}
        rows={2}
        style={{ ...shared.dashedInput, marginTop: 6 }}
        className="note-field"
      />

      {/* Evaluation rows */}
      {question.evaluations?.map((evaluation, evalIdx) => {
        const erstRating = erstRatings ? (erstRatings[question.id] || {})[evalIdx] : undefined;
        return (
          <EvalRow
            key={evalIdx}
            evaluation={evaluation}
            rating={(ratings[question.id] || {})[evalIdx]}
            erstRating={erstRating}
            onRate={(value) => dispatch(actions.setRating(question.id, evalIdx, value))}
          />
        );
      })}
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';
export default QuestionCard;
