import { memo } from 'react';
import { theme, shared } from '../theme';
import { ROOTS_TEXT } from '../data/templates';

/** ROOTS company intro deck */
const RootsBlock = memo(() => (
  <div style={shared.card}>
    <div style={{ fontSize: theme.font.body, fontWeight: 600, marginBottom: theme.spacing.xs }}>
      Intro Deck – Kernpunkte:
    </div>
    <div
      style={{
        whiteSpace: 'pre-wrap',
        fontSize: theme.font.body,
        lineHeight: 1.7,
        color: theme.colors.text.secondary,
      }}
    >
      {ROOTS_TEXT}
    </div>
  </div>
));

RootsBlock.displayName = 'RootsBlock';
export default RootsBlock;
