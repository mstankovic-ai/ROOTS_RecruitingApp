import { memo, useCallback, useState } from 'react';
import { theme } from '../theme';
import { actions } from '../hooks/useInterviewState';

const Header = memo(({ erst, isZweit, canSwitchToZweit, dispatch, saveStatus, onExportJson, onOpenDashboard, onReset }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const meta = erst.meta;

  const handleRoundChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === 'zweit' && !canSwitchToZweit) return;
      dispatch(actions.setMeta('runde', value));
    },
    [dispatch, canSwitchToZweit],
  );

  const handleMetaChange = useCallback(
    (field) => (e) => dispatch(actions.setMeta(field, e.target.value)),
    [dispatch],
  );

  const saveLabel =
    saveStatus === 'saving' ? 'Speichern...' : saveStatus === 'saved' ? 'Gespeichert' : '';

  const metaFields = [
    { key: 'kandidat', label: 'Kandidat:in', type: 'text', width: 180 },
    { key: 'interviewer', label: 'Interviewer:in', type: 'text', width: 180 },
    { key: 'datum', label: 'Datum', type: 'date', width: 160 },
  ];

  const btnStyle = {
    padding: '8px 18px',
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.border.glass}`,
    fontSize: theme.font.sm,
    fontWeight: 600,
    background: 'rgba(255,255,255,0.04)',
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    transition: `all ${theme.transition.fast}`,
    letterSpacing: '0.02em',
  };

  return (
    <header
      style={{
        background: theme.colors.bg.header,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        color: theme.colors.text.primary,
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${theme.colors.border.glass}`,
        boxShadow: theme.shadow.header,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: theme.spacing.md }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.radius.md,
              background: `linear-gradient(135deg, ${theme.colors.accent.indigo}, ${theme.colors.accent.indigoMid})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              boxShadow: theme.shadow.glow,
              flexShrink: 0,
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontSize: theme.font.xl, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              ROOTS <span style={{ color: theme.colors.text.secondary, fontWeight: 400 }}>Interviewleitfaden</span>
            </div>
            <div style={{ fontSize: theme.font.sm, color: theme.colors.text.muted, fontWeight: 400, letterSpacing: '0.02em' }}>
              Junior Marketing Consultant · Strukturiertes Interview
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="no-print">
          {saveLabel && (
            <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontWeight: 500, padding: '4px 10px', borderRadius: theme.radius.sm, background: 'rgba(255,255,255,0.03)' }}>
              {saveLabel}
            </span>
          )}

          <select
            value={meta.runde}
            onChange={handleRoundChange}
            style={{
              ...btnStyle,
              appearance: 'none',
              paddingRight: 30,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%238A8F98' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
            aria-label="Gesprächsrunde"
          >
            <option value="erst" style={{ background: '#1a1b26', color: '#fff' }}>Erstgespräch</option>
            <option value="zweit" disabled={!canSwitchToZweit} style={{ background: '#1a1b26', color: canSwitchToZweit ? '#fff' : '#555' }}>
              {canSwitchToZweit ? 'Zweitgespräch' : 'Zweitgespräch (gesperrt)'}
            </option>
          </select>

          {!canSwitchToZweit && !isZweit && (
            <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted }}>Empfehlung nötig</span>
          )}

          <button onClick={onExportJson} style={btnStyle} aria-label="JSON exportieren">
            Export JSON
          </button>

          <button
            onClick={() => window.print()}
            style={{
              ...btnStyle,
              background: theme.colors.accent.indigo,
              border: 'none',
              color: '#fff',
              boxShadow: `0 0 16px ${theme.colors.accent.indigoGlow}`,
            }}
            aria-label="PDF drucken"
          >
            PDF drucken
          </button>

          <button
            onClick={onOpenDashboard}
            style={{
              ...btnStyle,
              background: 'rgba(99, 102, 241, 0.12)',
              borderColor: 'rgba(99, 102, 241, 0.3)',
              color: theme.colors.text.accent,
            }}
            aria-label="Dashboard"
          >
            Dashboard
          </button>

          {showResetConfirm ? (
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: theme.font.xs, color: theme.colors.danger.text }}>Alles zurücksetzen?</span>
              <button
                onClick={() => { onReset(); setShowResetConfirm(false); }}
                style={{ ...btnStyle, borderColor: 'rgba(248,113,113,0.4)', color: theme.colors.danger.text, padding: '6px 12px' }}
              >
                Ja
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{ ...btnStyle, padding: '6px 12px' }}
              >
                Nein
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{ ...btnStyle, color: theme.colors.text.muted }}
              aria-label="Zurücksetzen"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', gap: 20, paddingBottom: 16, paddingTop: 4, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
        {metaFields.map(({ key, label, type, width }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: theme.font.xs, fontWeight: 500, color: theme.colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {label}
            </label>
            <input
              type={type}
              value={meta[key]}
              onChange={handleMetaChange(key)}
              placeholder={type === 'date' ? '' : 'Eingabe...'}
              aria-label={label}
              style={{
                padding: '8px 14px',
                borderRadius: theme.radius.sm,
                border: `1px solid ${theme.colors.border.glass}`,
                background: 'rgba(255,255,255,0.03)',
                color: theme.colors.text.primary,
                fontSize: theme.font.body,
                fontWeight: 500,
                width,
                transition: `border-color ${theme.transition.fast}`,
              }}
            />
          </div>
        ))}
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
