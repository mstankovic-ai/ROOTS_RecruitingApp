import { memo, useCallback } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';

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
        background: greyed ? theme.colors.bg.muted : theme.colors.bg.card,
        border: isChecked
          ? `2px solid ${theme.colors.accent.indigo}`
          : `1px solid ${theme.colors.border.default}`,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.sm + 4,
        transition: `all ${theme.transition.normal}`,
        opacity: greyed ? 0.5 : 1,
        boxShadow: isChecked ? `0 0 0 3px ${theme.colors.accent.indigo}15` : theme.shadow.sm,
      }}
      className="q-card"
    >
      {greyed && (
        <div
          style={{
            fontSize: theme.font.xs,
            color: theme.colors.text.muted,
            marginBottom: theme.spacing.sm,
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ color: theme.colors.success.badge }}>&#10003;</span> Im Erstgespräch gestellt
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {!hideCheck && (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleCheck}
            style={{ ...shared.checkbox, marginTop: 4 }}
            aria-label="Frage gestellt"
          />
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: theme.font.md,
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              color: theme.colors.text.primary,
              fontWeight: 450,
            }}
          >
            {question.text}
          </div>
          {question.followUp && (
            <div
              style={{
                fontSize: theme.font.body,
                color: theme.colors.accent.indigo,
                marginTop: 6,
                fontStyle: 'italic',
                lineHeight: 1.5,
                paddingLeft: 12,
                borderLeft: `2px solid ${theme.colors.accent.indigoMid}`,
              }}
            >
              {question.followUp}
            </div>
          )}
        </div>
      </div>

      {/* Observation checkboxes */}
      {question.checks && (
        <div
          style={{
            margin: `${theme.spacing.sm}px 0 4px 30px`,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: '10px 14px',
            background: theme.colors.bg.muted,
            borderRadius: theme.radius.md,
          }}
        >
          {question.checks.map((checkText, i) => (
            <label
              key={i}
              style={{
                fontSize: theme.font.body,
                color: theme.colors.text.secondary,
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                cursor: 'pointer',
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={!!(observations[question.id] || {})[i]}
                onChange={() => dispatch(actions.toggleObservation(question.id, i))}
                style={{ marginTop: 3, accentColor: theme.colors.accent.indigo }}
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
            marginTop: theme.spacing.sm,
            padding: '10px 14px',
            borderRadius: theme.radius.md,
            background: theme.colors.info.bg,
            fontSize: theme.font.sm,
            color: theme.colors.info.text,
            lineHeight: 1.6,
            border: `1px solid ${theme.colors.info.border}`,
          }}
        >
          <span style={{ fontWeight: 700 }}>Notizen EG:</span> {erstNote}
        </div>
      )}

      {/* Notes textarea */}
      <textarea
        placeholder="Notizen ..."
        value={notes[question.id] || ''}
        onChange={handleNoteChange}
        rows={2}
        style={{
          ...shared.dashedInput,
          marginTop: theme.spacing.sm + 4,
        }}
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
