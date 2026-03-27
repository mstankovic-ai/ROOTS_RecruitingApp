import { memo } from 'react';
import { DIMENSIONS, DIMENSION_COLORS } from '../data/dimensions';
import { theme } from '../theme';

const Badge = memo(({ dimension }) => {
  const color = DIMENSION_COLORS[dimension];
  return (
    <span
      style={{
        ...theme.shared?.badge,
        fontSize: theme.font.xs,
        fontWeight: 600,
        background: `${color}12`,
        color,
        padding: '3px 10px',
        borderRadius: theme.radius.full,
        border: `1px solid ${color}25`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}
    >
      {DIMENSIONS[dimension]}
    </span>
  );
});

Badge.displayName = 'Badge';
export default Badge;
