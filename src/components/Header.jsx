import { memo, useCallback, useState } from 'react';
import { theme } from '../theme';
import { actions } from '../hooks/useInterviewState';

const Header = memo(({ erst, canSwitchToZweit, dispatch, onExportJson, onOpenDashboard, onReset }) => {
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
    background: theme.colors.bg.muted,
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    transition: `all ${theme.transition.fast}`,
    letterSpacing: '0.02em',
  };

  const iconBtnStyle = {
    ...btnStyle,
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: theme.spacing.md }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: theme.radius.md,
              background: `linear-gradient(135deg, ${theme.colors.accent.indigo}, ${theme.colors.accent.indigoMid})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
              boxShadow: theme.shadow.glow, flexShrink: 0,
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontSize: theme.font.xl, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              ROOTS <span style={{ color: theme.colors.text.secondary, fontWeight: 400 }}>Interviewleitfaden</span>
            </div>
            <div style={{ fontSize: theme.font.sm, color: theme.colors.text.muted, fontWeight: 400, letterSpacing: '0.02em' }}>
              Junior Marketing Consultant &middot; Strukturiertes Interview
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} className="no-print">
          <select
            value={meta.runde}
            onChange={handleRoundChange}
            style={{
              ...btnStyle,
              appearance: 'none',
              paddingRight: 30,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%234A5568' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
            aria-label="Gesprächsrunde"
          >
            <option value="erst" style={{ background: '#fff', color: '#1A1A2E' }}>Erstgespräch</option>
            <option value="zweit" disabled={!canSwitchToZweit} style={{ background: '#fff', color: canSwitchToZweit ? '#1A1A2E' : '#A0AEC0' }}>
              {canSwitchToZweit ? 'Zweitgespräch' : 'Zweitgespräch (gesperrt)'}
            </option>
          </select>

          {/* Export JSON – icon only */}
          <button onClick={onExportJson} style={iconBtnStyle} aria-label="JSON exportieren" title="JSON exportieren">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>

          {/* PDF drucken */}
          <button
            onClick={() => window.print()}
            style={{ ...iconBtnStyle, background: theme.colors.accent.indigo, border: 'none', color: '#fff', boxShadow: theme.shadow.glow }}
            aria-label="PDF drucken"
            title="PDF drucken"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          </button>

          {/* Dashboard – icon only */}
          <button
            onClick={onOpenDashboard}
            style={{ ...iconBtnStyle, background: theme.colors.accent.indigoLight, borderColor: `${theme.colors.accent.indigo}30`, color: theme.colors.accent.indigo }}
            aria-label="Dashboard"
            title="Dashboard"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>

          {/* Reset – icon only */}
          {showResetConfirm ? (
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: theme.font.xs, color: theme.colors.danger.text }}>Reset?</span>
              <button onClick={() => { onReset(); setShowResetConfirm(false); }} style={{ ...btnStyle, borderColor: 'rgba(220,38,38,0.3)', color: theme.colors.danger.text, padding: '6px 12px' }}>
                Ja
              </button>
              <button onClick={() => setShowResetConfirm(false)} style={{ ...btnStyle, padding: '6px 12px' }}>
                Nein
              </button>
            </div>
          ) : (
            <button onClick={() => setShowResetConfirm(true)} style={{ ...iconBtnStyle, color: theme.colors.text.muted }} aria-label="Zurücksetzen" title="Zurücksetzen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            </button>
          )}
        </div>
      </div>

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
                padding: '8px 14px', borderRadius: theme.radius.sm,
                border: `1px solid ${theme.colors.border.glass}`,
                background: '#FAFBFC', color: theme.colors.text.primary,
                fontSize: theme.font.body, fontWeight: 500, width,
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
