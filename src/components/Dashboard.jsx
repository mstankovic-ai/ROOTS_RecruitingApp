import { memo, useMemo, useCallback, useState } from 'react';
import { theme, glassElevated } from '../theme';
import { getAllCandidates, removeCandidate } from '../utils/storage';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { calculateDimensionScores, calculateWeightedOverall, mergeRatings, DEFAULT_WEIGHTS } from '../utils/scoring';

const STATUS_COLORS = {
  'Zum Zweitgespräch einladen': { bg: 'rgba(99, 102, 241, 0.08)', text: '#4F46E5', border: 'rgba(99, 102, 241, 0.2)' },
  'Auf Warteliste': { bg: 'rgba(245, 158, 11, 0.08)', text: '#B45309', border: 'rgba(245, 158, 11, 0.2)' },
  'Absage': { bg: 'rgba(220, 38, 38, 0.08)', text: '#DC2626', border: 'rgba(220, 38, 38, 0.2)' },
  'Zum Case Interview einladen': { bg: 'rgba(34, 197, 94, 0.08)', text: '#16A34A', border: 'rgba(34, 197, 94, 0.2)' },
};

function getCandidateScore(data) {
  const erst = data.erst || {};
  const zweit = data.zweit || {};
  const isZweit = erst.meta?.runde === 'zweit';
  const effectiveRatings = isZweit ? mergeRatings(erst.ratings || {}, zweit.ratings || {}) : (erst.ratings || {});
  const scores = calculateDimensionScores(effectiveRatings);
  const weights = (isZweit ? zweit.weights : erst.weights) || DEFAULT_WEIGHTS;
  scores.weightedOverall = calculateWeightedOverall(scores.averages, weights);
  return scores;
}

function getStatus(data) {
  const erst = data.erst || {};
  const zweit = data.zweit || {};
  const isZweit = erst.meta?.runde === 'zweit';
  const recommendation = isZweit ? (zweit.recommendation || erst.recommendation) : erst.recommendation;
  return recommendation || 'Offen';
}

function getRunde(data) {
  return data.erst?.meta?.runde === 'zweit' ? 'Zweitgespräch' : 'Erstgespräch';
}

const Dashboard = memo(({ onBack, onOpenDetail, onLoadCandidate }) => {
  const [candidates, setCandidates] = useState(() => getAllCandidates());
  const [confirmDelete, setConfirmDelete] = useState(null);

  const sorted = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const nameA = (a.data.erst?.meta?.kandidat || '').toLowerCase();
      const nameB = (b.data.erst?.meta?.kandidat || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [candidates]);

  const handleDelete = useCallback((key) => {
    removeCandidate(key);
    setCandidates(getAllCandidates());
    setConfirmDelete(null);
  }, []);

  const handleStartZweit = useCallback((data) => {
    onLoadCandidate(data);
  }, [onLoadCandidate]);

  const btnStyle = {
    padding: '6px 14px', borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.border.glass}`,
    fontSize: theme.font.sm, fontWeight: 600,
    background: theme.colors.bg.muted, color: theme.colors.text.secondary,
    cursor: 'pointer', transition: `all ${theme.transition.fast}`,
  };

  return (
    <div style={{ padding: `${theme.spacing.xl}px`, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.xl }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', color: theme.colors.text.primary }}>
            Kandidaten-Dashboard
          </div>
          <div style={{ fontSize: theme.font.body, color: theme.colors.text.muted, marginTop: 4 }}>
            {sorted.length} {sorted.length === 1 ? 'Kandidat' : 'Kandidaten'} gespeichert
          </div>
        </div>
        <button onClick={onBack} style={{
          ...btnStyle, background: theme.colors.accent.indigo, border: 'none',
          color: '#fff', padding: '10px 22px', fontSize: theme.font.md, boxShadow: theme.shadow.glow,
        }}>
          Neues Interview
        </button>
      </div>

      {sorted.length === 0 && (
        <div style={{ ...glassElevated, padding: theme.spacing.xxl, textAlign: 'center', color: theme.colors.text.muted, fontSize: theme.font.md }}>
          Noch keine Kandidaten vorhanden. Starte ein Interview, um Daten zu erfassen.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        {sorted.map(({ key, data }) => {
          const meta = data.erst?.meta || {};
          const status = getStatus(data);
          const runde = getRunde(data);
          const scores = getCandidateScore(data);
          const statusColor = STATUS_COLORS[status] || { bg: theme.colors.bg.muted, text: theme.colors.text.muted, border: theme.colors.border.glass };
          const canStartZweit = status === 'Zum Zweitgespräch einladen';
          const isInZweit = data.erst?.meta?.runde === 'zweit';

          return (
            <div key={key} style={{ ...glassElevated, padding: theme.spacing.lg, display: 'flex', flexDirection: 'column', gap: theme.spacing.md, transition: `all ${theme.transition.normal}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: theme.radius.full,
                    background: `linear-gradient(135deg, ${theme.colors.accent.indigo}, ${theme.colors.accent.indigoMid})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, color: '#fff', flexShrink: 0,
                  }}>
                    {(meta.kandidat || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: theme.font.lg, fontWeight: 700, color: theme.colors.text.primary }}>
                      {meta.kandidat || 'Unbenannt'}
                    </div>
                    <div style={{ fontSize: theme.font.sm, color: theme.colors.text.muted, display: 'flex', gap: 12 }}>
                      {meta.datum && <span>{meta.datum}</span>}
                      {meta.interviewer && <span>Interviewer: {meta.interviewer}</span>}
                      <span style={{ color: theme.colors.accent.indigo }}>{runde}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <span style={{ padding: '6px 14px', borderRadius: theme.radius.full, fontSize: theme.font.sm, fontWeight: 600, background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}` }}>
                    {status}
                  </span>
                  {scores.weightedOverall != null && (
                    <div style={{ padding: '6px 14px', borderRadius: theme.radius.full, background: `linear-gradient(135deg, ${theme.colors.accent.indigoDark}, ${theme.colors.accent.indigo})`, color: '#fff', fontSize: theme.font.md, fontWeight: 800, fontFamily: theme.fontMono, boxShadow: theme.shadow.glow }}>
                      {scores.weightedOverall.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>

              {Object.keys(scores.averages).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {Object.keys(DIMENSIONS).map((dk) => {
                    const avg = scores.averages[dk];
                    if (avg == null) return null;
                    const color = DIMENSION_COLORS[dk];
                    return (
                      <div key={dk} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: theme.radius.sm, background: `${color}08`, border: `1px solid ${color}15`, fontSize: theme.font.xs, color: theme.colors.text.secondary }}>
                        <div style={{ width: 6, height: 6, borderRadius: theme.radius.full, background: color }} />
                        <span>{DIMENSIONS[dk].split(' ')[0]}</span>
                        <span style={{ fontWeight: 700, color, fontFamily: theme.fontMono }}>{avg.toFixed(1)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
                <button onClick={() => onOpenDetail(data, key)} style={btnStyle}>Detailbericht</button>
                {canStartZweit && !isInZweit && (
                  <button onClick={() => handleStartZweit(data)} style={{ ...btnStyle, background: theme.colors.accent.indigoLight, borderColor: `${theme.colors.accent.indigo}30`, color: theme.colors.accent.indigo }}>
                    Zweitgespräch starten
                  </button>
                )}
                {isInZweit && (
                  <button onClick={() => handleStartZweit(data)} style={{ ...btnStyle, background: theme.colors.accent.indigoLight, borderColor: `${theme.colors.accent.indigo}30`, color: theme.colors.accent.indigo }}>
                    Zweitgespräch fortsetzen
                  </button>
                )}
                {!isInZweit && !canStartZweit && (
                  <button onClick={() => handleStartZweit(data)} style={btnStyle}>Interview fortsetzen</button>
                )}
                {confirmDelete === key ? (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: theme.font.sm, color: theme.colors.danger.text }}>Wirklich löschen?</span>
                    <button onClick={() => handleDelete(key)} style={{ ...btnStyle, borderColor: 'rgba(220,38,38,0.3)', color: theme.colors.danger.text }}>Ja</button>
                    <button onClick={() => setConfirmDelete(null)} style={btnStyle}>Nein</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(key)} style={{ ...btnStyle, color: theme.colors.text.muted }}>Löschen</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;
