/**
 * ROOTS Interview App – Design Tokens
 *
 * Based on UI UX Pro Max recommendations:
 * - Swiss Modernism 2.0: mathematical 8px grid, Inter font, high contrast
 * - Bento Grid: rounded cards, soft shadows, clear hierarchy
 * - WCAG AAA accessibility targets
 */

export const theme = {
  colors: {
    bg: {
      primary: '#F5F5F7',
      card: '#FFFFFF',
      muted: '#F8FAFC',
      elevated: '#FFFFFF',
      header: '#0F172A',
      headerGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    },
    border: {
      default: '#E2E8F0',
      subtle: '#F1F5F9',
      active: '#6366F1',
      strong: '#0F172A',
      dashed: '#CBD5E1',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#94A3B8',
      accent: '#4338CA',
      white: '#FFFFFF',
      inverse: '#F8FAFC',
    },
    accent: {
      indigo: '#6366F1',
      indigoDark: '#4338CA',
      indigoLight: '#EEF2FF',
      indigoMid: '#A5B4FC',
    },
    info: {
      bg: '#EEF2FF',
      border: '#C7D2FE',
      text: '#3730A3',
    },
    warning: {
      bg: '#FFFBEB',
      border: '#FCD34D',
      text: '#92400E',
      textDark: '#78350F',
    },
    hint: {
      bg: '#FFFBEB',
      border: '#FDE68A',
      text: '#92400E',
    },
    case: {
      bg: '#F0F9FF',
      border: '#BAE6FD',
      text: '#0C4A6E',
    },
    success: {
      bg: '#F0FDF4',
      text: '#166534',
      badge: '#22C55E',
    },
    danger: {
      text: '#DC2626',
    },
    eval: {
      bg: '#FAFBFD',
    },
  },

  /* 8px base grid */
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 9999,
  },

  /* Typographic scale – Inter */
  font: {
    xs: 11,
    sm: 12,
    body: 13,
    md: 14,
    lg: 15,
    xl: 17,
    title: 20,
    header: 22,
  },

  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', ui-monospace, monospace",

  /* Elevation system */
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.04)',
    md: '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
    lg: '0 4px 16px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04)',
    xl: '0 8px 32px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.06)',
    header: '0 1px 3px rgba(15, 23, 42, 0.1), 0 1px 2px rgba(15, 23, 42, 0.06)',
  },

  transition: {
    fast: '120ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
  },
};

/** Shared style objects */
export const shared = {
  card: {
    background: theme.colors.bg.card,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.shadow.sm,
    transition: `box-shadow ${theme.transition.normal}, border-color ${theme.transition.normal}`,
  },

  cardElevated: {
    background: theme.colors.bg.card,
    border: `1px solid ${theme.colors.border.subtle}`,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.shadow.md,
  },

  dashedInput: {
    width: '100%',
    padding: '10px 14px',
    border: `1.5px solid ${theme.colors.border.default}`,
    borderRadius: theme.radius.md,
    fontSize: theme.font.body,
    fontFamily: 'inherit',
    resize: 'vertical',
    background: theme.colors.bg.muted,
    boxSizing: 'border-box',
    lineHeight: 1.6,
    transition: `border-color ${theme.transition.fast}`,
    color: theme.colors.text.primary,
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    borderBottom: `2px solid ${theme.colors.text.primary}`,
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  subSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: `1.5px solid ${theme.colors.border.default}`,
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  checkbox: {
    width: 18,
    height: 18,
    accentColor: theme.colors.accent.indigo,
    cursor: 'pointer',
    flexShrink: 0,
  },

  badge: {
    fontSize: theme.font.xs,
    fontWeight: 600,
    padding: '2px 10px',
    borderRadius: theme.radius.full,
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  },

  buttonPrimary: {
    padding: '8px 20px',
    borderRadius: theme.radius.md,
    border: 'none',
    fontSize: theme.font.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: `all ${theme.transition.fast}`,
    letterSpacing: '0.01em',
  },
};
