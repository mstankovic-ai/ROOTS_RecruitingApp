import { memo, useCallback } from 'react';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { theme, shared } from '../theme';
import { actions } from '../hooks/useInterviewState';

/**
 * Overall evaluation panel: dimension scores, overall impression, recommendation.
 */
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
    <div style={{ marginTop: theme.spacing.xl, marginBottom: 40 }}>
      <div
        style={{
          fontSize: theme.font.title,
          fontWeight: 800,
          borderBottom: `3px solid ${theme.colors.text.primary}`,
          paddingBottom: 5,
          marginBottom: theme.spacing.md,
        }}
      >
        Gesamtevaluation
      </div>

      {/* Dimension scores grid */}
      <div
        style={{
          ...shared.card,
          borderRadius: theme.radius.xl,
          padding: 16,
          marginBottom: theme.spacing.md,
        }}
      >
        <div style={{ fontSize: theme.font.md, fontWeight: 700, marginBottom: 10 }}>
          Score pro Evaluationsdimension
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.sm }}>
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
                  gap: 6,
                  padding: '7px 10px',
                  borderRadius: theme.radius.md,
                  background: avg ? `${color}08` : theme.colors.bg.muted,
                  border: `1px solid ${avg ? `${color}30` : theme.colors.border.default}`,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 99,
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: theme.font.body, flex: 1 }}>{DIMENSIONS[dimKey]}</span>
                <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted }}>
                  {count > 0 ? `${count} Bew.` : ''}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: avg ? color : theme.colors.border.dashed,
                    minWidth: 32,
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
            marginTop: theme.font.body,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
            padding: '10px 14px',
            background: theme.colors.bg.header,
            borderRadius: theme.radius.md,
            color: theme.colors.text.white,
          }}
        >
          <span style={{ fontSize: theme.font.md, fontWeight: 600 }}>
            Gesamtscore (&#216; Dimensionen):
          </span>
          <span style={{ fontSize: 22, fontWeight: 800 }}>
            {dimScores.overall ? dimScores.overall.toFixed(1) : '\u2013'}
          </span>
          <span style={{ fontSize: theme.font.body, opacity: 0.6 }}>/ 5.0</span>
        </div>
      </div>

      {/* Erst-Gesamteindruck (shown in Zweit) */}
      {isZweit && erst.gesamtNote && (
        <div
          style={{
            background: theme.colors.info.bg,
            border: `1px solid ${theme.colors.info.border}`,
            borderRadius: theme.radius.xl,
            padding: theme.spacing.md,
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: theme.font.body, fontWeight: 600, color: theme.colors.info.text, marginBottom: theme.spacing.xs }}>
            Gesamteindruck Erstgespräch:
          </div>
          <div style={{ fontSize: theme.font.body, color: theme.colors.info.text, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
            {erst.gesamtNote}
          </div>
        </div>
      )}

      {/* Gesamteindruck textarea */}
      <div style={{ ...shared.card, borderRadius: theme.radius.xl, padding: 16, marginBottom: theme.spacing.md }}>
        <div style={{ fontSize: theme.font.md, fontWeight: 700, marginBottom: theme.spacing.sm }}>
          Gesamteindruck{isZweit ? ' Zweitgespräch' : ''}
        </div>
        <textarea
          placeholder="Freitext-Notizen zum Gesamteindruck …"
          value={currentState.gesamtNote}
          onChange={handleGesamtNote}
          rows={4}
          style={{ ...shared.dashedInput, padding: '8px 10px', borderRadius: 6 }}
        />
      </div>

      {/* Recommendation */}
      <div
        style={{
          background: theme.colors.bg.card,
          border: `2px solid ${theme.colors.border.strong}`,
          borderRadius: theme.radius.xl,
          padding: 16,
        }}
      >
        <div style={{ fontSize: theme.font.md, fontWeight: 700, marginBottom: 10 }}>
          Empfehlung
        </div>
        <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          {options.map((opt) => {
            const isSelected = currentState.recommendation === opt;
            return (
              <button
                key={opt}
                onClick={() => dispatch(actions.setRecommendation(opt))}
                style={{
                  padding: '8px 18px',
                  borderRadius: theme.radius.md,
                  border: isSelected ? `2px solid ${theme.colors.border.strong}` : '1.5px solid #d1d5db',
                  background: isSelected ? theme.colors.bg.header : theme.colors.bg.card,
                  color: isSelected ? theme.colors.text.white : '#475569',
                  fontSize: theme.font.md,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {isSelected ? '\u2713 ' : ''}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Anmerkungen für Zweitinterviewer (only Erst, when invited) */}
        {!isZweit && (canSwitchToZweit) && (
          <div style={{ marginTop: theme.spacing.md, borderTop: `1px solid ${theme.colors.border.default}`, paddingTop: 12 }}>
            <div style={{ fontSize: theme.font.md, fontWeight: 700, marginBottom: 6, color: theme.colors.warning.text }}>
              &#128221; Anmerkungen für den Zweitinterviewer
            </div>
            <textarea
              placeholder="Was sollte der Zweitinterviewer wissen oder vertiefen?"
              value={erst.zweitAnmerkung}
              onChange={handleZweitAnmerkung}
              rows={3}
              style={{
                ...shared.dashedInput,
                padding: '8px 10px',
                borderColor: '#d97706',
                borderRadius: 6,
                background: theme.colors.hint.bg,
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
