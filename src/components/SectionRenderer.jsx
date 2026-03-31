import { memo } from 'react';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';
import ScriptBlock from './ScriptBlock';
import RootsBlock from './RootsBlock';
import RTIBlock from './RTIBlock';
import OutroBlock from './OutroBlock';
import CaseBlock from './CaseBlock';
import CultureFitBlock from './CultureFitBlock';
import SectionTimer from './SectionTimer';
import QuestionCard from './QuestionCard';

const SectionRenderer = memo(({ section, sectionNum, isZweit, erst, zweit, currentState, dispatch, kandidat, interviewer }) => {
  if (!sectionNum.visible) return null;
  const caseChecked = section.isCase ? !!currentState.caseChecks[section.caseKey] : false;
  const caseGreyed = section.isCase && isZweit && !!erst.caseChecks[section.caseKey];
  const rtiGreyed = section.type === 'rti' && isZweit && erst.rtiDone;

  return (
    <div id={`section-${section.id}`} style={{ marginBottom: theme.spacing.xl + 8 }}>
      {section.main && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: `1px solid ${theme.colors.border.strong}`, paddingBottom: 14, marginBottom: theme.spacing.lg }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: theme.colors.accent.indigo, letterSpacing: '-1px', lineHeight: 1, textShadow: `0 0 24px ${theme.colors.accent.indigoGlow}` }}>
            {sectionNum.mainNumber}.
          </span>
          <span style={{ fontSize: theme.font.xl, fontWeight: 700, color: theme.colors.text.primary }}>{section.main}</span>
          {section.time && !section.sub && (
            <div style={{ marginLeft: 'auto' }}>
              <SectionTimer
                sectionId={section.id}
                timeStr={section.time}
                timerMinutes={currentState.timerMinutes || {}}
                dispatch={dispatch}
                setTimer={actions.setTimer}
              />
            </div>
          )}
        </div>
      )}

      {section.sub && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${theme.colors.border.glass}`, paddingBottom: 12, marginBottom: theme.spacing.lg }}>
          {section.isCase && <input type="checkbox" checked={caseChecked} onChange={() => dispatch(actions.toggleCaseCheck(section.caseKey))} style={shared.checkbox} />}
          <span style={{ fontSize: theme.font.body, fontWeight: 500, color: theme.colors.text.muted, fontFamily: theme.fontMono }}>{sectionNum.subNumber}</span>
          <span style={{ fontSize: theme.font.lg, fontWeight: 600, color: theme.colors.text.primary }}>{section.sub}</span>
          {section.time && (
            <div style={{ marginLeft: 'auto' }}>
              <SectionTimer
                sectionId={section.id}
                timeStr={section.time}
                timerMinutes={currentState.timerMinutes || {}}
                dispatch={dispatch}
                setTimer={actions.setTimer}
              />
            </div>
          )}
          {caseGreyed && (
            <span style={{ fontSize: theme.font.xs, color: theme.colors.success.text, fontWeight: 500, padding: '3px 10px', background: theme.colors.success.bg, borderRadius: theme.radius.full }}>
              &#10003; Im EG durchgeführt
            </span>
          )}
        </div>
      )}

      {section.hint && (
        <div style={{ background: theme.colors.hint.bg, border: `1px solid ${theme.colors.hint.border}`, borderRadius: theme.radius.md, padding: '12px 18px', fontSize: theme.font.body, color: theme.colors.hint.text, marginBottom: theme.spacing.md, lineHeight: 1.7, display: 'flex', gap: 8 }}>
          <span style={{ fontWeight: 700, flexShrink: 0 }}>Tipp:</span>
          <span>{section.hint}</span>
        </div>
      )}

      {section.type === 'script' && <ScriptBlock isZweit={isZweit} kandidat={kandidat} interviewer={interviewer} />}
      {section.type === 'roots' && <RootsBlock />}
      {section.type === 'rti' && <RTIBlock rtiDone={currentState.rtiDone} rtiGreyed={rtiGreyed} isZweit={isZweit} erst={erst} zweit={zweit} dispatch={dispatch} />}
      {section.type === 'outro' && <OutroBlock isZweit={isZweit} kandidat={kandidat} abschlussNotes={currentState.abschlussNotes} dispatch={dispatch} />}
      {section.caseText && <CaseBlock caseText={section.caseText} greyed={caseGreyed} />}
      {section.type === 'culturefit' && (
        <CultureFitBlock
          section={section}
          cultureFitAnswers={currentState.cultureFitAnswers || {}}
          ratings={currentState.ratings}
          dispatch={dispatch}
          erstRatings={isZweit ? erst.ratings : null}
          isZweit={isZweit}
        />
      )}

      {section.type !== 'culturefit' && section.questions?.map((question) => {
        const greyed = (!section.isCase && isZweit && erst.checks[question.id]) || (section.isCase && caseGreyed);
        return (
          <QuestionCard
            key={question.id} question={question} checks={currentState.checks} notes={currentState.notes}
            observations={currentState.observations} ratings={currentState.ratings} dispatch={dispatch}
            greyed={greyed} erstRatings={isZweit ? erst.ratings : null}
            hideCheck={!!section.isCase || !!section.noQuestionCheck}
            erstNote={isZweit ? (erst.notes[question.id] || '') : ''} isZweit={isZweit}
          />
        );
      }) || null}
    </div>
  );
});

SectionRenderer.displayName = 'SectionRenderer';
export default SectionRenderer;
