import { memo, useCallback } from 'react';
import { theme } from '../theme';
import { actions } from '../hooks/useInterviewState';

/**
 * Sticky header with app title, meta inputs (candidate, interviewer, date),
 * round selector, PDF button, auto-save indicator, and JSON export.
 */
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
    { key: 'kandidat', label: 'Kandidat:in', type: 'text' },
    { key: 'interviewer', label: 'Interviewer:in', type: 'text' },
    { key: 'datum', label: 'Datum', type: 'date' },
  ];

  return (
    <div
      style={{
        background: theme.colors.bg.headerGradient,
        color: theme.colors.text.white,
        padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}
      >
        <div>
          <div style={{ fontSize: theme.font.header, fontWeight: 800, letterSpacing: '-.3px' }}>
            ROOTS Interviewleitfaden
          </div>
          <div style={{ fontSize: theme.font.body, opacity: 0.7 }}>
            Junior Marketing Consultant · Strukturiertes Interview (MMI)
          </div>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }} className="no-print">
          {saveLabel && (
            <span style={{ fontSize: theme.font.xs, opacity: 0.6 }}>{saveLabel}</span>
          )}
          <select
            value={meta.runde}
            onChange={handleRoundChange}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: 'none',
              fontSize: theme.font.body,
              fontWeight: 600,
              background: 'rgba(255,255,255,.15)',
              color: theme.colors.text.white,
              cursor: 'pointer',
            }}
            aria-label="Gesprächsrunde wählen"
          >
            <option value="erst" style={{ color: '#000' }}>Erstgespräch</option>
            <option value="zweit" disabled={!canSwitchToZweit} style={{ color: canSwitchToZweit ? '#000' : '#aaa' }}>
              {canSwitchToZweit ? 'Zweitgespräch' : 'Zweitgespräch (gesperrt)'}
            </option>
          </select>
          {!canSwitchToZweit && !isZweit && (
            <span style={{ fontSize: theme.font.xs, opacity: 0.5 }}>Empfehlung nötig</span>
          )}
          <button
            onClick={onExportJson}
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: theme.font.body,
              fontWeight: 600,
              background: 'rgba(255,255,255,.15)',
              color: theme.colors.text.white,
              cursor: 'pointer',
              transition: 'background 150ms',
            }}
            aria-label="Als JSON exportieren"
          >
            JSON
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: theme.font.body,
              fontWeight: 600,
              background: theme.colors.accent.indigo,
              color: theme.colors.text.white,
              cursor: 'pointer',
              transition: 'background 150ms',
            }}
            aria-label="Als PDF drucken"
          >
            PDF
          </button>
        </div>
      </div>

      {/* Meta inputs */}
      <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
        {metaFields.map(({ key, label, type }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: theme.font.sm, opacity: 0.7 }}>{label}</span>
            <input
              type={type}
              value={meta[key]}
              onChange={handleMetaChange(key)}
              placeholder={type === 'date' ? '' : 'Name'}
              aria-label={label}
              style={{
                padding: '3px 8px',
                borderRadius: theme.radius.sm,
                border: '1px solid rgba(255,255,255,.25)',
                background: 'rgba(255,255,255,.1)',
                color: theme.colors.text.white,
                fontSize: theme.font.body,
                width: type === 'date' ? 130 : 150,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

Header.displayName = 'Header';
export default Header;
