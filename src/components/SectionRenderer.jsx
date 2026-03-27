import { memo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import ScriptBlock from './ScriptBlock';
import RootsBlock from './RootsBlock';
import RTIBlock from './RTIBlock';
import OutroBlock from './OutroBlock';
import CaseBlock from './CaseBlock';
import QuestionCard from './QuestionCard';

/**
 * Renders a single section: header, type-specific block, and question cards.
 */
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
    <div id={`section-${section.id}`} style={{ marginBottom: 24 }}>
      {/* Main section header */}
      {section.main && (
        <div style={shared.sectionHeader}>
          <span style={{ fontSize: theme.font.xl, fontWeight: 700 }}>
            {sectionNum.mainNumber}. {section.main}
          </span>
          {section.time && !section.sub && (
            <span style={{ fontSize: theme.font.sm, color: theme.colors.text.muted, fontWeight: 500 }}>
              {section.time}
            </span>
          )}
        </div>
      )}

      {/* Sub-section header */}
      {section.sub && (
        <div style={shared.subSectionHeader}>
          {section.isCase && (
            <input
              type="checkbox"
              checked={caseChecked}
              onChange={() => dispatch(actions.toggleCaseCheck(section.caseKey))}
              style={shared.checkbox}
              aria-label={`Case ${section.caseKey} durchgeführt`}
            />
          )}
          <span style={{ fontSize: theme.font.lg, fontWeight: 600, color: theme.colors.text.secondary }}>
            {sectionNum.subNumber} {section.sub}
          </span>
          {section.time && (
            <span style={{ fontSize: theme.font.sm, color: theme.colors.text.muted }}>
              {section.time}
            </span>
          )}
          {caseGreyed && (
            <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontStyle: 'italic' }}>
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
            padding: '6px 10px',
            fontSize: theme.font.sm,
            color: theme.colors.hint.text,
            marginBottom: theme.spacing.sm,
            lineHeight: 1.5,
          }}
        >
          &#9432; {section.hint}
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

      {/* Case text */}
      {section.caseText && <CaseBlock caseText={section.caseText} greyed={caseGreyed} />}

      {/* Questions */}
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
