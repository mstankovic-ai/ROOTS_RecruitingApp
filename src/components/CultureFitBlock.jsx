import { memo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import EvalRow from './EvalRow';

const CultureFitBlock = memo(({ section, cultureFitAnswers, ratings, dispatch, erstRatings }) => {
  const questions = section.cultureFitQuestions || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      {questions.map((q, idx) => {
        const selected = cultureFitAnswers[q.id] || null;
        return (
          <div key={q.id} style={{ ...shared.card, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: theme.font.sm, color: theme.colors.text.muted, fontFamily: theme.fontMono, fontWeight: 600, minWidth: 24 }}>
              {idx + 1}.
            </span>
            <button
              onClick={() => dispatch(actions.setCultureFit(q.id, 'A'))}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: theme.radius.md,
                border: selected === 'A'
                  ? `2px solid ${theme.colors.accent.indigo}`
                  : `1px solid ${theme.colors.border.glass}`,
                background: selected === 'A' ? theme.colors.accent.indigoLight : theme.colors.bg.muted,
                color: selected === 'A' ? theme.colors.accent.indigo : theme.colors.text.secondary,
                fontSize: theme.font.md,
                fontWeight: selected === 'A' ? 600 : 400,
                cursor: 'pointer',
                transition: `all ${theme.transition.fast}`,
                fontFamily: 'inherit',
                boxShadow: selected === 'A' ? theme.shadow.glow : 'none',
              }}
            >
              {q.optionA}
            </button>
            <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontWeight: 500 }}>oder</span>
            <button
              onClick={() => dispatch(actions.setCultureFit(q.id, 'B'))}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: theme.radius.md,
                border: selected === 'B'
                  ? `2px solid ${theme.colors.accent.indigo}`
                  : `1px solid ${theme.colors.border.glass}`,
                background: selected === 'B' ? theme.colors.accent.indigoLight : theme.colors.bg.muted,
                color: selected === 'B' ? theme.colors.accent.indigo : theme.colors.text.secondary,
                fontSize: theme.font.md,
                fontWeight: selected === 'B' ? 600 : 400,
                cursor: 'pointer',
                transition: `all ${theme.transition.fast}`,
                fontFamily: 'inherit',
                boxShadow: selected === 'B' ? theme.shadow.glow : 'none',
              }}
            >
              {q.optionB}
            </button>
          </div>
        );
      })}

      {/* ROOTS-Fit Evaluation */}
      {section.questions?.map((question) =>
        question.evaluations?.map((ev, evalIdx) => (
          <EvalRow
            key={`${question.id}_${evalIdx}`}
            evaluation={ev}
            rating={ratings?.[question.id]?.[evalIdx] ?? null}
            erstRating={erstRatings?.[question.id]?.[evalIdx] ?? null}
            onRate={(v) => dispatch(actions.setRating(question.id, evalIdx, v))}
          />
        ))
      )}
    </div>
  );
});

CultureFitBlock.displayName = 'CultureFitBlock';
export default CultureFitBlock;
