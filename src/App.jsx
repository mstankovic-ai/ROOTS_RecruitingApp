import { useCallback, useEffect, useState } from 'react';
import { SECTIONS } from './data/sections';
import { theme } from './theme';
import { useInterviewState, actions } from './hooks/useInterviewState';
import { exportAsJson } from './utils/storage';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import Navigation from './components/Navigation';
import SectionRenderer from './components/SectionRenderer';
import GesamtEvaluation from './components/GesamtEvaluation';
import RoundSwitchDialog from './components/RoundSwitchDialog';

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
    saveStatus,
  } = useInterviewState();

  const [showSwitchDialog, setShowSwitchDialog] = useState(false);

  const kandidat = currentState.meta.kandidat;
  const interviewer = currentState.meta.interviewer;

  /** Wrap round-switch dispatch with confirmation dialog */
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

  /** JSON export handler */
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

  /** Keyboard shortcut: Cmd/Ctrl+S to prevent browser save dialog */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        background: theme.colors.bg.primary,
        minHeight: '100vh',
        color: theme.colors.text.primary,
      }}
    >
      <style>{`@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:10px}.no-print{display:none!important}.note-field{border:1px solid #ccc!important;min-height:30px}.q-card{break-inside:avoid;page-break-inside:avoid}}`}</style>

      {showSwitchDialog && (
        <RoundSwitchDialog
          onConfirm={confirmSwitch}
          onCancel={() => setShowSwitchDialog(false)}
        />
      )}

      <Header
        erst={erst}
        isZweit={isZweit}
        canSwitchToZweit={canSwitchToZweit}
        dispatch={headerDispatch}
        saveStatus={saveStatus}
        onExportJson={handleExportJson}
      />

      <InfoBar isZweit={isZweit} />

      <Navigation
        sectionNumbers={sectionNumbers}
        isZweit={isZweit}
        currentState={currentState}
      />

      <div
        style={{
          padding: `${theme.spacing.md}px 18px`,
          maxWidth: 920,
          margin: '0 auto',
          marginLeft: 220,
        }}
      >
        {/* Zweitgespräch: notes from first interviewer */}
        {isZweit && erst.zweitAnmerkung && (
          <div
            style={{
              background: theme.colors.warning.bg,
              border: `1px solid ${theme.colors.warning.border}`,
              borderRadius: theme.radius.lg,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.lg,
            }}
          >
            <div
              style={{
                fontSize: theme.font.md,
                fontWeight: 700,
                color: theme.colors.warning.text,
                marginBottom: 6,
              }}
            >
              &#128221; Anmerkungen vom Erstinterviewer
            </div>
            <div
              style={{
                fontSize: theme.font.body,
                lineHeight: 1.6,
                color: theme.colors.warning.textDark,
                whiteSpace: 'pre-wrap',
              }}
            >
              {erst.zweitAnmerkung}
            </div>
          </div>
        )}

        {/* Sections */}
        {SECTIONS.map((section, idx) => (
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
    </div>
  );
}
