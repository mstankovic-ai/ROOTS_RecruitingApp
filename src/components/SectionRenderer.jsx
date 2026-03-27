import { memo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import ScriptBlock from './ScriptBlock';
import RootsBlock from './RootsBlock';
import RTIBlock from './RTIBlock';
import OutroBlock from './OutroBlock';
import CaseBlock from './CaseBlock';
import QuestionCard from './QuestionCard';

const SectionRenderer = memo(({
  section,
  sectionNum,
  isZweit,
  erst,
  zweit,
  currentState,
  dispatch,
  kandidat,
  interviewer,
}) => {
  if (!sectionNum.visible) return null;

  const caseChecked = section.isCase ? !!currentState.caseChecks[section.caseKey] : false;
  const caseGreyed = section.isCase && isZweit && !!erst.caseChecks[section.caseKey];
  const rtiGreyed = section.type === 'rti' && isZweit && erst.rtiDone;

  return (
    <div id={`section-${section.id}`} style={{ marginBottom: theme.spacing.xl }}>
      {/* Main section header */}
      {section.main && (
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            borderBottom: `2px solid ${theme.colors.text.primary}`,
            paddingBottom: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: theme.colors.text.primary,
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}
          >
            {sectionNum.mainNumber}.
          </span>
          <span
            style={{
              fontSize: theme.font.xl,
              fontWeight: 700,
              color: theme.colors.text.primary,
            }}
          >
            {section.main}
          </span>
          {section.time && !section.sub && (
            <span
              style={{
                fontSize: theme.font.sm,
                color: theme.colors.text.muted,
                fontWeight: 500,
                marginLeft: 'auto',
                padding: '3px 10px',
                background: theme.colors.bg.muted,
                borderRadius: theme.radius.full,
              }}
            >
              {section.time}
            </span>
          )}
        </div>
      )}

      {/* Sub-section header */}
      {section.sub && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: `1.5px solid ${theme.colors.border.default}`,
            paddingBottom: 10,
            marginBottom: theme.spacing.md,
          }}
        >
          {section.isCase && (
            <input
              type="checkbox"
              checked={caseChecked}
              onChange={() => dispatch(actions.toggleCaseCheck(section.caseKey))}
              style={shared.checkbox}
              aria-label={`Case ${section.caseKey} durchgeführt`}
            />
          )}
          <span
            style={{
              fontSize: theme.font.md,
              fontWeight: 500,
              color: theme.colors.text.muted,
              minWidth: 32,
            }}
          >
            {sectionNum.subNumber}
          </span>
          <span style={{ fontSize: theme.font.lg, fontWeight: 600, color: theme.colors.text.primary }}>
            {section.sub}
          </span>
          {section.time && (
            <span
              style={{
                fontSize: theme.font.sm,
                color: theme.colors.text.muted,
                fontWeight: 500,
                marginLeft: 'auto',
                padding: '3px 10px',
                background: theme.colors.bg.muted,
                borderRadius: theme.radius.full,
              }}
            >
              {section.time}
            </span>
          )}
          {caseGreyed && (
            <span
              style={{
                fontSize: theme.font.xs,
                color: theme.colors.success.text,
                fontWeight: 500,
                padding: '3px 10px',
                background: theme.colors.success.bg,
                borderRadius: theme.radius.full,
              }}
            >
              &#10003; Im EG durchgeführt
            </span>
          )}
        </div>
      )}

      {/* Hint box */}
      {section.hint && (
        <div
          style={{
            background: theme.colors.hint.bg,
            border: `1px solid ${theme.colors.hint.border}`,
            borderRadius: theme.radius.md,
            padding: '10px 16px',
            fontSize: theme.font.body,
            color: theme.colors.hint.text,
            marginBottom: theme.spacing.md,
            lineHeight: 1.6,
            display: 'flex',
            gap: 8,
          }}
        >
          <span style={{ fontWeight: 700, flexShrink: 0 }}>Tipp:</span>
          <span>{section.hint}</span>
        </div>
      )}

      {/* Type-specific blocks */}
      {section.type === 'script' && (
        <ScriptBlock isZweit={isZweit} kandidat={kandidat} interviewer={interviewer} />
      )}
      {section.type === 'roots' && <RootsBlock />}
      {section.type === 'rti' && (
        <RTIBlock
          rtiDone={currentState.rtiDone}
          rtiGreyed={rtiGreyed}
          isZweit={isZweit}
          erst={erst}
          zweit={zweit}
          dispatch={dispatch}
        />
      )}
      {section.type === 'outro' && (
        <OutroBlock
          isZweit={isZweit}
          kandidat={kandidat}
          abschlussNotes={currentState.abschlussNotes}
          dispatch={dispatch}
        />
      )}

      {section.caseText && <CaseBlock caseText={section.caseText} greyed={caseGreyed} />}

      {section.questions?.map((question) => {
        const isNonCaseGreyed = !section.isCase && isZweit && erst.checks[question.id];
        const greyed = isNonCaseGreyed || (section.isCase && caseGreyed);
        const erstNote = isZweit ? (erst.notes[question.id] || '') : '';

        return (
          <QuestionCard
            key={question.id}
            question={question}
            checks={currentState.checks}
            notes={currentState.notes}
            observations={currentState.observations}
            ratings={currentState.ratings}
            dispatch={dispatch}
            greyed={greyed}
            erstRatings={isZweit ? erst.ratings : null}
            hideCheck={!!section.isCase || !!section.noQuestionCheck}
            erstNote={erstNote}
            isZweit={isZweit}
          />
        );
      })}
    </div>
  );
});

SectionRenderer.displayName = 'SectionRenderer';
export default SectionRenderer;
