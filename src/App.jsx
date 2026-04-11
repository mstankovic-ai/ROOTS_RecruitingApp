import { useCallback, useEffect, useState } from 'react';
import { getSections, SECTIONS_ERST } from './data/sections';
import { theme } from './theme';
import { useInterviewState, actions } from './hooks/useInterviewState';
import { exportAsJson } from './utils/storage';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import Navigation from './components/Navigation';
import SectionRenderer from './components/SectionRenderer';
import GesamtEvaluation from './components/GesamtEvaluation';
import RoundSwitchDialog from './components/RoundSwitchDialog';
import Dashboard from './components/Dashboard';
import DetailReport from './components/DetailReport';
import ErstScriptViewer from './components/ErstScriptViewer';
import UnevaluatedQuestionsBlock from './components/UnevaluatedQuestionsBlock';
import GlobalTimer from './components/GlobalTimer';

export default function App() {
  const {
    erst,
    zweit,
    currentState,
    isZweit,
    canSwitchToZweit,
    dispatch,
    dimScores,
    sectionNumbers,
    resetAll,
    loadCandidate,
  } = useInterviewState();

  const [view, setView] = useState('interview');
  const [detailData, setDetailData] = useState(null);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [showErstScript, setShowErstScript] = useState(false);

  const kandidat = currentState.meta.kandidat;
  const interviewer = currentState.meta.interviewer;
  const sections = getSections(isZweit);

  const headerDispatch = useCallback(
    (action) => {
      if (action.type === 'SET_META' && action.field === 'runde' && action.value === 'zweit') {
        setShowSwitchDialog(true);
        return;
      }
      dispatch(action);
    },
    [dispatch],
  );

  const confirmSwitch = useCallback(() => {
    setShowSwitchDialog(false);
    dispatch(actions.setMeta('runde', 'zweit'));
  }, [dispatch]);

  const handleOpenDashboard = useCallback(() => setView('dashboard'), []);

  const handleOpenDetail = useCallback((data) => {
    setDetailData(data);
    setView('detail');
  }, []);

  const handleLoadCandidate = useCallback((data) => {
    loadCandidate(data);
    const rec = data.erst?.recommendation;
    const alreadyZweit = data.erst?.meta?.runde === 'zweit';
    if (rec === 'Zum Zweitgespräch einladen' && !alreadyZweit) {
      setTimeout(() => dispatch(actions.setMeta('runde', 'zweit')), 50);
    }
    setView('interview');
    window.scrollTo(0, 0);
  }, [loadCandidate, dispatch]);

  const handleReset = useCallback(() => {
    resetAll();
    setView('interview');
    window.scrollTo(0, 0);
  }, [resetAll]);

  const handleNewInterview = useCallback(() => {
    resetAll();
    setView('interview');
    window.scrollTo(0, 0);
  }, [resetAll]);

  const handleExportJson = useCallback(() => {
    const data = {
      erst,
      zweit,
      scores: dimScores,
      exportedAt: new Date().toISOString(),
    };
    const name = kandidat || 'interview';
    const date = erst.meta.datum || new Date().toISOString().slice(0, 10);
    exportAsJson(data, `roots-interview-${name}-${date}.json`);
  }, [erst, zweit, dimScores, kandidat]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') e.preventDefault();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div style={{ fontFamily: theme.fontFamily, background: theme.colors.bg.base, minHeight: '100vh', color: theme.colors.text.primary }}>
      {showSwitchDialog && (
        <RoundSwitchDialog onConfirm={confirmSwitch} onCancel={() => setShowSwitchDialog(false)} />
      )}

      {showErstScript && (
        <ErstScriptViewer erst={erst} onClose={() => setShowErstScript(false)} />
      )}

      {view === 'dashboard' && (
        <Dashboard onBack={handleNewInterview} onOpenDetail={handleOpenDetail} onLoadCandidate={handleLoadCandidate} />
      )}

      {view === 'detail' && detailData && (
        <DetailReport data={detailData} onBack={() => setView('dashboard')} onLoadCandidate={handleLoadCandidate} />
      )}

      {view === 'interview' && (
        <>
          <Header
            erst={erst}
            isZweit={isZweit}
            canSwitchToZweit={canSwitchToZweit}
            dispatch={headerDispatch}
            onExportJson={handleExportJson}
            onOpenDashboard={handleOpenDashboard}
            onReset={handleReset}
          />

          <InfoBar isZweit={isZweit} onShowErstScript={isZweit ? () => setShowErstScript(true) : null} />

          <Navigation sectionNumbers={sectionNumbers} isZweit={isZweit} currentState={currentState} />

          <div style={{ padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`, maxWidth: 880, margin: '0 auto', marginLeft: 240 }}>
            {/* Global Timer */}
            <div style={{ marginBottom: theme.spacing.lg }}>
              <GlobalTimer isZweit={isZweit} />
            </div>

            {/* Zweitgespräch: notes from first interviewer */}
            {isZweit && erst.zweitAnmerkung && (
              <div style={{ background: theme.colors.warning.bg, border: `1px solid ${theme.colors.warning.border}`, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                <div style={{ fontSize: theme.font.md, fontWeight: 700, color: theme.colors.warning.text, marginBottom: 6 }}>
                  Anmerkungen vom Erstinterviewer
                </div>
                <div style={{ fontSize: theme.font.body, lineHeight: 1.6, color: theme.colors.warning.textDark, whiteSpace: 'pre-wrap' }}>
                  {erst.zweitAnmerkung}
                </div>
              </div>
            )}

            {/* Unevaluated questions from Erst (shown in Zweit) */}
            {isZweit && (
              <UnevaluatedQuestionsBlock erst={erst} dispatch={dispatch} currentState={currentState} />
            )}

            {/* Sections */}
            {sections.map((section, idx) => (
              <SectionRenderer
                key={section.id}
                section={section}
                sectionNum={sectionNumbers[idx]}
                isZweit={isZweit}
                erst={erst}
                zweit={zweit}
                currentState={currentState}
                dispatch={dispatch}
                kandidat={kandidat}
                interviewer={interviewer}
              />
            ))}

            {/* Overall evaluation */}
            <GesamtEvaluation
              dimScores={dimScores}
              isZweit={isZweit}
              erst={erst}
              currentState={currentState}
              dispatch={dispatch}
              canSwitchToZweit={canSwitchToZweit}
            />
          </div>
        </>
      )}
    </div>
  );
}
