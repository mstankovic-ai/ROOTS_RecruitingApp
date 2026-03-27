import { memo, useCallback } from 'react';
import { theme } from '../theme';
import { actions } from '../hooks/useInterviewState';

const Header = memo(({ erst, isZweit, canSwitchToZweit, dispatch, saveStatus, onExportJson }) => {
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
    { key: 'datum', label: 'Datum', type: 'date', width: 150 },
  ];

  return (
    <header
      style={{
        background: theme.colors.bg.headerGradient,
        color: theme.colors.text.white,
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: theme.shadow.xl,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: theme.spacing.md,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Logo mark */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.radius.md,
              background: theme.colors.accent.indigo,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: '-0.5px',
              flexShrink: 0,
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontSize: theme.font.xl, fontWeight: 800, letterSpacing: '-0.4px', lineHeight: 1.2 }}>
              ROOTS Interviewleitfaden
            </div>
            <div style={{ fontSize: theme.font.sm, opacity: 0.5, fontWeight: 400, letterSpacing: '0.02em' }}>
              Junior Marketing Consultant · Strukturiertes Interview
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="no-print">
          {saveLabel && (
            <span
              style={{
                fontSize: theme.font.xs,
                opacity: 0.5,
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: theme.radius.sm,
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              {saveLabel}
            </span>
          )}

          <select
            value={meta.runde}
            onChange={handleRoundChange}
            style={{
              padding: '7px 14px',
              borderRadius: theme.radius.sm,
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: theme.font.body,
              fontWeight: 600,
              background: 'rgba(255,255,255,0.08)',
              color: theme.colors.text.white,
              cursor: 'pointer',
              appearance: 'none',
              paddingRight: 28,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
            aria-label="Gesprächsrunde wählen"
          >
            <option value="erst" style={{ color: '#000' }}>Erstgespräch</option>
            <option value="zweit" disabled={!canSwitchToZweit} style={{ color: canSwitchToZweit ? '#000' : '#aaa' }}>
              {canSwitchToZweit ? 'Zweitgespräch' : 'Zweitgespräch (gesperrt)'}
            </option>
          </select>

          {!canSwitchToZweit && !isZweit && (
            <span style={{ fontSize: theme.font.xs, opacity: 0.4, fontWeight: 500 }}>Empfehlung nötig</span>
          )}

          <button
            onClick={onExportJson}
            style={{
              padding: '7px 16px',
              borderRadius: theme.radius.sm,
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: theme.font.sm,
              fontWeight: 600,
              background: 'rgba(255,255,255,0.06)',
              color: theme.colors.text.white,
              cursor: 'pointer',
              transition: `background ${theme.transition.fast}`,
              letterSpacing: '0.02em',
            }}
            aria-label="Als JSON exportieren"
          >
            Export JSON
          </button>

          <button
            onClick={() => window.print()}
            style={{
              padding: '7px 16px',
              borderRadius: theme.radius.sm,
              border: 'none',
              fontSize: theme.font.sm,
              fontWeight: 600,
              background: theme.colors.accent.indigo,
              color: theme.colors.text.white,
              cursor: 'pointer',
              transition: `background ${theme.transition.fast}`,
              letterSpacing: '0.02em',
            }}
            aria-label="Als PDF drucken"
          >
            PDF drucken
          </button>
        </div>
      </div>

      {/* Meta inputs row */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          paddingBottom: 16,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 12,
        }}
      >
        {metaFields.map(({ key, label, type, width }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label
              style={{
                fontSize: theme.font.xs,
                fontWeight: 500,
                opacity: 0.4,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </label>
            <input
              type={type}
              value={meta[key]}
              onChange={handleMetaChange(key)}
              placeholder={type === 'date' ? '' : 'Eingabe...'}
              aria-label={label}
              style={{
                padding: '7px 12px',
                borderRadius: theme.radius.sm,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.06)',
                color: theme.colors.text.white,
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
