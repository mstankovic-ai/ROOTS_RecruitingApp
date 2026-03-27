import { memo, useCallback } from 'react';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';

const GesamtEvaluation = memo(({
  dimScores,
  isZweit,
  erst,
  currentState,
  dispatch,
  canSwitchToZweit,
}) => {
  const erstOptions = ['Zum Zweitgespräch einladen', 'Absage', 'Auf Warteliste'];
  const zweitOptions = ['Zum Case Interview einladen', 'Absage'];
  const options = isZweit ? zweitOptions : erstOptions;

  const handleGesamtNote = useCallback(
    (e) => dispatch(actions.setGesamtNote(e.target.value)),
    [dispatch],
  );

  const handleZweitAnmerkung = useCallback(
    (e) => dispatch(actions.setZweitAnmerkung(e.target.value)),
    [dispatch],
  );

  return (
    <div style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.xxl, paddingBottom: theme.spacing.xxl }}>
      {/* Section title */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          borderBottom: `3px solid ${theme.colors.text.primary}`,
          paddingBottom: 12,
          marginBottom: theme.spacing.lg,
          color: theme.colors.text.primary,
        }}
      >
        Gesamtevaluation
      </div>

      {/* Dimension scores */}
      <div style={{ ...shared.cardElevated, marginBottom: theme.spacing.md }}>
        <div
          style={{
            fontSize: theme.font.xs,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.colors.text.muted,
            marginBottom: theme.spacing.md,
          }}
        >
          Score pro Evaluationsdimension
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.sm + 4 }}>
          {Object.keys(DIMENSIONS).map((dimKey) => {
            const avg = dimScores.averages[dimKey];
            const count = dimScores.perDimension[dimKey].count;
            const color = DIMENSION_COLORS[dimKey];

            return (
              <div
                key={dimKey}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: theme.radius.md,
                  background: avg ? `${color}06` : theme.colors.bg.muted,
                  border: `1px solid ${avg ? `${color}20` : theme.colors.border.subtle}`,
                  transition: `all ${theme.transition.normal}`,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: theme.radius.full,
                    background: color,
                    flexShrink: 0,
                    boxShadow: avg ? `0 0 6px ${color}40` : 'none',
                  }}
                />
                <span style={{ fontSize: theme.font.body, flex: 1, fontWeight: 500, color: theme.colors.text.primary }}>
                  {DIMENSIONS[dimKey]}
                </span>
                <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontWeight: 500 }}>
                  {count > 0 ? `${count} Bew.` : ''}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    fontFamily: theme.fontMono,
                    color: avg ? color : theme.colors.border.dashed,
                    minWidth: 40,
                    textAlign: 'right',
                  }}
                >
                  {avg ? avg.toFixed(1) : '\u2013'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overall score bar */}
        <div
          style={{
            marginTop: theme.spacing.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
            padding: '14px 20px',
            background: theme.colors.bg.header,
            borderRadius: theme.radius.md,
            color: theme.colors.text.white,
          }}
        >
          <span style={{ fontSize: theme.font.md, fontWeight: 500, opacity: 0.7 }}>
            Gesamtscore (&#216; Dimensionen):
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, fontFamily: theme.fontMono, letterSpacing: '-0.5px' }}>
            {dimScores.overall ? dimScores.overall.toFixed(1) : '\u2013'}
          </span>
          <span style={{ fontSize: theme.font.body, opacity: 0.4, fontWeight: 500 }}>/ 5.0</span>
        </div>
      </div>

      {/* Erst-Gesamteindruck (shown in Zweit) */}
      {isZweit && erst.gesamtNote && (
        <div
          style={{
            background: theme.colors.info.bg,
            border: `1px solid ${theme.colors.info.border}`,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.lg,
            marginBottom: theme.spacing.md,
          }}
        >
          <div style={{ fontSize: theme.font.xs, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: theme.colors.info.text, marginBottom: theme.spacing.sm }}>
            Gesamteindruck Erstgespräch
          </div>
          <div style={{ fontSize: theme.font.body, color: theme.colors.info.text, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {erst.gesamtNote}
          </div>
        </div>
      )}

      {/* Gesamteindruck textarea */}
      <div style={{ ...shared.cardElevated, marginBottom: theme.spacing.md }}>
        <div
          style={{
            fontSize: theme.font.xs,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.colors.text.muted,
            marginBottom: theme.spacing.sm + 4,
          }}
        >
          Gesamteindruck{isZweit ? ' Zweitgespräch' : ''}
        </div>
        <textarea
          placeholder="Freitext-Notizen zum Gesamteindruck ..."
          value={currentState.gesamtNote}
          onChange={handleGesamtNote}
          rows={4}
          style={shared.dashedInput}
        />
      </div>

      {/* Recommendation */}
      <div
        style={{
          background: theme.colors.bg.card,
          border: `2px solid ${theme.colors.border.strong}`,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          boxShadow: theme.shadow.md,
        }}
      >
        <div
          style={{
            fontSize: theme.font.xs,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.colors.text.muted,
            marginBottom: theme.spacing.md,
          }}
        >
          Empfehlung
        </div>
        <div style={{ display: 'flex', gap: theme.spacing.sm + 4, flexWrap: 'wrap' }}>
          {options.map((opt) => {
            const isSelected = currentState.recommendation === opt;
            return (
              <button
                key={opt}
                onClick={() => dispatch(actions.setRecommendation(opt))}
                style={{
                  padding: '10px 24px',
                  borderRadius: theme.radius.md,
                  border: isSelected ? `2px solid ${theme.colors.border.strong}` : `1.5px solid ${theme.colors.border.default}`,
                  background: isSelected ? theme.colors.bg.header : theme.colors.bg.card,
                  color: isSelected ? theme.colors.text.white : theme.colors.text.secondary,
                  fontSize: theme.font.md,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: `all ${theme.transition.fast}`,
                  letterSpacing: '0.01em',
                  boxShadow: isSelected ? theme.shadow.md : 'none',
                }}
              >
                {isSelected && (
                  <span style={{ marginRight: 6 }}>&#10003;</span>
                )}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Anmerkungen für Zweitinterviewer */}
        {!isZweit && canSwitchToZweit && (
          <div style={{ marginTop: theme.spacing.lg, borderTop: `1px solid ${theme.colors.border.default}`, paddingTop: theme.spacing.md }}>
            <div
              style={{
                fontSize: theme.font.xs,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: theme.colors.warning.text,
                marginBottom: theme.spacing.sm + 4,
              }}
            >
              Anmerkungen für den Zweitinterviewer
            </div>
            <textarea
              placeholder="Was sollte der Zweitinterviewer wissen oder vertiefen?"
              value={erst.zweitAnmerkung}
              onChange={handleZweitAnmerkung}
              rows={3}
              style={{
                ...shared.dashedInput,
                borderColor: theme.colors.warning.border,
                background: theme.colors.warning.bg,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
});

GesamtEvaluation.displayName = 'GesamtEvaluation';
export default GesamtEvaluation;
