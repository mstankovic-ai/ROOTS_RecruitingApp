import { memo, useState, useCallback } from 'react';
import { DIMENSION_COLORS } from '../data/dimensions';
import { theme } from '../theme';
import Badge from './Badge';

/**
 * Single evaluation row with expandable anchor texts and 1-5 rating buttons.
 * Supports keyboard shortcuts: press 1-5 when focused to rate.
 */
const EvalRow = memo(({ evaluation, rating, erstRating, onRate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const color = DIMENSION_COLORS[evaluation.dimension];
  const displayRating = rating != null ? rating : erstRating;
  const isInherited = rating == null && erstRating != null;

  const handleKeyDown = useCallback(
    (e) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        e.preventDefault();
        onRate(num);
      }
    },
    [onRate],
  );

  return (
    <div
      style={{
        marginTop: theme.spacing.xs,
        border: `1px solid ${theme.colors.border.default}`,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        background: theme.colors.eval.bg,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label={`Bewertung: ${evaluation.label}`}
    >
      {/* Header row */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: `6px ${theme.spacing.md - 4}px`,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: theme.font.sm,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          &#9654;
        </span>
        <span style={{ fontSize: theme.font.body, fontWeight: 600, flex: 1 }}>
          {evaluation.label}
        </span>
        <Badge dimension={evaluation.dimension} />
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isInherited && (
            <span style={{ fontSize: 9, color: theme.colors.text.muted, marginRight: 4 }}>
              EG
            </span>
          )}
          {[1, 2, 3, 4, 5].map((n) => {
            const isActive = displayRating === n;
            return (
              <button
                key={n}
                onClick={(e) => {
                  e.stopPropagation();
                  onRate(n);
                }}
                aria-label={`Bewertung ${n}`}
                aria-pressed={isActive}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: theme.radius.sm,
                  border: isActive ? `2px solid ${color}` : `1.5px solid #d1d5db`,
                  background: isActive ? `${color}${isInherited ? '10' : '20'}` : theme.colors.bg.card,
                  fontSize: theme.font.body,
                  fontWeight: 700,
                  color: isActive ? color : '#9ca3af',
                  cursor: 'pointer',
                  padding: 0,
                  opacity: isInherited && !isActive ? 0.5 : 1,
                  transition: 'all 150ms',
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable anchor texts */}
      {isOpen && (
        <div
          style={{
            padding: `${theme.spacing.xs}px ${theme.spacing.md - 4}px ${theme.spacing.sm}px`,
            fontSize: theme.font.sm,
            lineHeight: 1.6,
            color: theme.colors.text.secondary,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '3px 6px' }}>
            <span style={{ fontWeight: 700, color: theme.colors.danger.text }}>1</span>
            <span>{evaluation.anchor1}</span>
            <span style={{ fontWeight: 700, color: '#d97706' }}>3</span>
            <span>{evaluation.anchor3}</span>
            <span style={{ fontWeight: 700, color: theme.colors.success.text }}>5</span>
            <span>{evaluation.anchor5}</span>
          </div>
        </div>
      )}
    </div>
  );
});

EvalRow.displayName = 'EvalRow';
export default EvalRow;
