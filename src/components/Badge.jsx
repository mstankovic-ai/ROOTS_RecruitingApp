import { memo } from 'react';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { theme } from '../theme';

/** Colored dimension badge (e.g. "Ownership & Drive") */
const Badge = memo(({ dimension }) => {
  const color = DIMENSION_COLORS[dimension];
  return (
    <span
      style={{
        fontSize: theme.font.xs,
        fontWeight: 600,
        background: `${color}15`,
        color,
        padding: '1px 7px',
        borderRadius: 99,
        border: `1px solid ${color}35`,
        whiteSpace: 'nowrap',
      }}
    >
      {DIMENSIONS[dimension]}
    </span>
  );
});

Badge.displayName = 'Badge';
export default Badge;
