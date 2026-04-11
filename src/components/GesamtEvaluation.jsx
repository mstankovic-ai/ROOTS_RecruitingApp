import { memo, useCallback, useState } from 'react';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { DEFAULT_WEIGHTS } from '../utils/scoring';
import { theme, shared, glassElevated } from '../theme';
import { actions } from '../hooks/useInterviewState';

const GesamtEvaluation = memo(({ dimScores, isZweit, erst, currentState, dispatch, canSwitchToZweit }) => {
  const options = isZweit ? ['Zum Case Interview einladen', 'Absage'] : ['Zum Zweitgespräch einladen', 'Absage'];
  const handleGesamtNote = useCallback((e) => dispatch(actions.setGesamtNote(e.target.value)), [dispatch]);
  const handleZweitAnmerkung = useCallback((e) => dispatch(actions.setZweitAnmerkung(e.target.value)), [dispatch]);
  const [showWeights, setShowWeights] = useState(false);
  const weights = currentState.weights || DEFAULT_WEIGHTS;

  return (
    <div style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.xxl, paddingBottom: theme.spacing.xxl }}>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', borderBottom: `1px solid ${theme.colors.border.strong}`, paddingBottom: 14, marginBottom: theme.spacing.lg, color: theme.colors.text.primary }}>
        Gesamtevaluation
      </div>

      {/* Dimension scores */}
      <div style={{ ...glassElevated, padding: theme.spacing.lg, boxShadow: theme.shadow.elevated, marginBottom: theme.spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.md }}>
          <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.text.muted }}>
            Score pro Evaluationsdimension
          </div>
          <button
            onClick={() => setShowWeights(p => !p)}
            style={{
              fontSize: theme.font.xs, color: theme.colors.text.muted,
              background: showWeights ? theme.colors.accent.indigoLight : theme.colors.bg.muted,
              border: `1px solid ${showWeights ? theme.colors.accent.indigo + '30' : theme.colors.border.glass}`,
              borderRadius: theme.radius.sm, padding: '4px 10px',
              cursor: 'pointer', fontWeight: 500, transition: `all ${theme.transition.fast}`,
            }}
          >
            Gewichtung {showWeights ? 'ausblenden' : 'anpassen'}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.sm + 4 }}>
          {Object.keys(DIMENSIONS).map((dk) => {
            const avg = dimScores.averages[dk];
            const cnt = dimScores.perDimension[dk].count;
            const color = DIMENSION_COLORS[dk];
            const w = weights[dk] ?? 1;
            return (
              <div key={dk} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: theme.radius.md, background: avg ? `${color}08` : theme.colors.bg.muted, border: `1px solid ${avg ? `${color}20` : theme.colors.border.subtle}`, transition: `all ${theme.transition.normal}` }}>
                <div style={{ width: 10, height: 10, borderRadius: theme.radius.full, background: color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: theme.font.body, fontWeight: 500, color: theme.colors.text.primary }}>{DIMENSIONS[dk]}</span>
                  {showWeights && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted }}>Gewicht:</span>
                      {[0.5, 1, 1.5, 2].map(v => (
                        <button
                          key={v}
                          onClick={() => dispatch(actions.setWeight(dk, v))}
                          style={{
                            width: 28, height: 22, borderRadius: 4,
                            border: w === v ? `1px solid ${color}` : `1px solid ${theme.colors.border.glass}`,
                            background: w === v ? `${color}15` : 'transparent',
                            color: w === v ? color : theme.colors.text.muted,
                            fontSize: theme.font.xs, fontWeight: w === v ? 700 : 400,
                            cursor: 'pointer', padding: 0, fontFamily: theme.fontMono,
                          }}
                        >
                          {v}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontWeight: 500 }}>{cnt > 0 ? `${cnt} Bew.` : ''}</span>
                {showWeights && w !== 1 && (
                  <span style={{ fontSize: theme.font.xs, color, fontWeight: 600, fontFamily: theme.fontMono }}>{w}x</span>
                )}
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: theme.fontMono, color: avg ? color : theme.colors.text.muted, minWidth: 44, textAlign: 'right' }}>
                  {avg ? avg.toFixed(1) : '\u2013'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overall score */}
        <div style={{ marginTop: theme.spacing.lg, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, padding: '16px 24px', background: `linear-gradient(135deg, ${theme.colors.accent.indigoDark}, ${theme.colors.accent.indigo})`, borderRadius: theme.radius.md, color: '#fff', boxShadow: theme.shadow.glow }}>
          <span style={{ fontSize: theme.font.md, fontWeight: 500, opacity: 0.8 }}>Gewichteter Gesamtscore:</span>
          <span style={{ fontSize: 32, fontWeight: 800, fontFamily: theme.fontMono, letterSpacing: '-1px' }}>{dimScores.weightedOverall ? dimScores.weightedOverall.toFixed(1) : '\u2013'}</span>
          <span style={{ fontSize: theme.font.body, opacity: 0.5, fontWeight: 500 }}>/ 5.0</span>
        </div>
      </div>

      {/* Erst impression in Zweit */}
      {isZweit && erst.gesamtNote && (
        <div style={{ background: theme.colors.info.bg, border: `1px solid ${theme.colors.info.border}`, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: theme.spacing.md }}>
          <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.info.text, marginBottom: theme.spacing.sm }}>Gesamteindruck Erstgespräch</div>
          <div style={{ fontSize: theme.font.body, color: theme.colors.info.text, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{erst.gesamtNote}</div>
        </div>
      )}

      {/* Gesamteindruck */}
      <div style={{ ...shared.cardElevated, marginBottom: theme.spacing.md }}>
        <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.text.muted, marginBottom: theme.spacing.sm + 4 }}>
          Gesamteindruck{isZweit ? ' Zweitgespräch' : ''}
        </div>
        <textarea placeholder="Freitext-Notizen zum Gesamteindruck ..." value={currentState.gesamtNote} onChange={handleGesamtNote} rows={4} style={shared.dashedInput} />
      </div>

      {/* Recommendation */}
      <div style={{ ...glassElevated, padding: theme.spacing.lg, boxShadow: theme.shadow.elevated, border: `1px solid ${theme.colors.border.strong}` }}>
        <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.text.muted, marginBottom: theme.spacing.md }}>Empfehlung</div>
        <div style={{ display: 'flex', gap: theme.spacing.sm + 4, flexWrap: 'wrap' }}>
          {options.map((opt) => {
            const sel = currentState.recommendation === opt;
            return (
              <button key={opt} onClick={() => dispatch(actions.setRecommendation(opt))} style={{
                padding: '12px 28px', borderRadius: theme.radius.md,
                border: sel ? `1px solid ${theme.colors.accent.indigo}` : `1px solid ${theme.colors.border.glass}`,
                background: sel ? `linear-gradient(135deg, ${theme.colors.accent.indigoDark}, ${theme.colors.accent.indigo})` : theme.colors.bg.muted,
                color: sel ? '#fff' : theme.colors.text.secondary,
                fontSize: theme.font.md, fontWeight: 600, cursor: 'pointer',
                transition: `all ${theme.transition.fast}`, letterSpacing: '0.01em',
                boxShadow: sel ? theme.shadow.glow : 'none',
              }}>
                {sel && <span style={{ marginRight: 8 }}>&#10003;</span>}{opt}
              </button>
            );
          })}
        </div>

        {!isZweit && canSwitchToZweit && (
          <div style={{ marginTop: theme.spacing.lg, borderTop: `1px solid ${theme.colors.border.glass}`, paddingTop: theme.spacing.md }}>
            <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.warning.text, marginBottom: theme.spacing.sm + 4 }}>
              Anmerkungen für den Zweitinterviewer
            </div>
            <textarea placeholder="Was sollte der Zweitinterviewer wissen oder vertiefen?" value={erst.zweitAnmerkung} onChange={handleZweitAnmerkung} rows={3} style={{ ...shared.dashedInput, borderColor: theme.colors.warning.border, background: theme.colors.warning.bg }} />
          </div>
        )}
      </div>
    </div>
  );
});

GesamtEvaluation.displayName = 'GesamtEvaluation';
export default GesamtEvaluation;
