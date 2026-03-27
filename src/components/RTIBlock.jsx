import { memo, useCallback } from 'react';
import { theme, shared } from '../theme';
import { RTI_TEXT } from '../data/templates';
import { actions } from '../hooks/useInterviewState';

/** Realistische Tätigkeitsinformation block with checkbox */
const RTIBlock = memo(({ rtiDone, rtiGreyed, isZweit, erst, zweit, dispatch }) => (
  <div
    style={{
      ...shared.card,
      background: rtiDone || rtiGreyed ? theme.colors.bg.primary : theme.colors.bg.card,
      opacity: rtiGreyed ? 0.5 : 1,
      transition: 'opacity 200ms',
    }}
  >
    {rtiGreyed && (
      <div style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, marginBottom: theme.spacing.xs, fontStyle: 'italic' }}>
        &#10003; Im Erstgespräch besprochen
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: 6 }}>
      <input
        type="checkbox"
        checked={isZweit ? zweit.rtiDone : erst.rtiDone}
        onChange={() => dispatch(actions.toggleRti())}
        style={shared.checkbox}
        aria-label="RTI vorgelesen"
      />
      <span style={{ fontSize: theme.font.body, fontWeight: 600 }}>
        Realistische Tätigkeitsinformation vorgelesen
      </span>
    </div>
    <div
      style={{
        whiteSpace: 'pre-wrap',
        fontSize: theme.font.body,
        lineHeight: 1.7,
        color: theme.colors.text.secondary,
      }}
    >
      {RTI_TEXT}
    </div>
  </div>
));

RTIBlock.displayName = 'RTIBlock';
export default RTIBlock;
