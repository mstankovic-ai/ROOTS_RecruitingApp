import { memo, useState, useCallback } from 'react';
import { DIMENSION_COLORS } from '../data/dimensions';
import { theme } from '../theme';
import Badge from './Badge';

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
        marginTop: theme.spacing.sm,
        border: `1px solid ${theme.colors.border.default}`,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        background: theme.colors.bg.card,
        boxShadow: theme.shadow.sm,
        transition: `box-shadow ${theme.transition.fast}`,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label={`Bewertung: ${evaluation.label}`}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: theme.colors.text.muted,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: `transform ${theme.transition.fast}`,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          &#9654;
        </span>
        <span style={{ fontSize: theme.font.body, fontWeight: 600, flex: 1, color: theme.colors.text.primary }}>
          {evaluation.label}
        </span>
        <Badge dimension={evaluation.dimension} />
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 4 }}>
          {isInherited && (
            <span
              style={{
                fontSize: theme.font.xs,
                color: theme.colors.text.muted,
                marginRight: 6,
                fontWeight: 500,
                padding: '2px 6px',
                borderRadius: theme.radius.sm,
                background: theme.colors.bg.muted,
              }}
            >
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
                  width: 32,
                  height: 32,
                  borderRadius: theme.radius.sm,
                  border: isActive ? `2px solid ${color}` : `1.5px solid ${theme.colors.border.default}`,
                  background: isActive ? `${color}18` : theme.colors.bg.card,
                  fontSize: theme.font.body,
                  fontWeight: 700,
                  color: isActive ? color : theme.colors.text.muted,
                  cursor: 'pointer',
                  padding: 0,
                  opacity: isInherited && !isActive ? 0.4 : 1,
                  transition: `all ${theme.transition.fast}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            padding: '0 14px 14px',
            borderTop: `1px solid ${theme.colors.border.subtle}`,
            marginTop: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: '8px 12px',
              paddingTop: 12,
              fontSize: theme.font.sm,
              lineHeight: 1.6,
              color: theme.colors.text.secondary,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: theme.colors.danger.text,
                fontSize: theme.font.body,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FEF2F2',
                borderRadius: theme.radius.sm,
                height: 28,
              }}
            >
              1
            </span>
            <span style={{ paddingTop: 4 }}>{evaluation.anchor1}</span>

            <span
              style={{
                fontWeight: 700,
                color: '#D97706',
                fontSize: theme.font.body,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFBEB',
                borderRadius: theme.radius.sm,
                height: 28,
              }}
            >
              3
            </span>
            <span style={{ paddingTop: 4 }}>{evaluation.anchor3}</span>

            <span
              style={{
                fontWeight: 700,
                color: theme.colors.success.text,
                fontSize: theme.font.body,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.colors.success.bg,
                borderRadius: theme.radius.sm,
                height: 28,
              }}
            >
              5
            </span>
            <span style={{ paddingTop: 4 }}>{evaluation.anchor5}</span>
          </div>
        </div>
      )}
    </div>
  );
});

EvalRow.displayName = 'EvalRow';
export default EvalRow;
