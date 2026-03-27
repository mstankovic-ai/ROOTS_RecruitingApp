/**
 * Design tokens for the ROOTS Interview app.
 * All visual constants are centralized here – no magic numbers in components.
 */

export const theme = {
  colors: {
    bg: {
      primary: '#f1f5f9',
      card: '#fff',
      muted: '#f8fafc',
      header: '#1a1a2e',
      headerGradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    },
    border: {
      default: '#e2e8f0',
      active: '#6366f1',
      strong: '#1a1a2e',
      dashed: '#cbd5e1',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#334155',
      muted: '#94a3b8',
      accent: '#4338ca',
      white: '#fff',
    },
    accent: {
      indigo: '#6366f1',
      indigoDark: '#4338ca',
    },
    info: {
      bg: '#eef2ff',
      border: '#c7d2fe',
      text: '#4338ca',
    },
    warning: {
      bg: '#fef3c7',
      border: '#fbbf24',
      text: '#92400e',
      textDark: '#78350f',
    },
    hint: {
      bg: '#fffbeb',
      border: '#fde68a',
      text: '#92400e',
    },
    case: {
      bg: '#f0f9ff',
      border: '#bae6fd',
      text: '#0c4a6e',
    },
    success: {
      text: '#059669',
    },
    danger: {
      text: '#dc2626',
    },
    eval: {
      bg: '#fafbfc',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },
  radius: {
    sm: 5,
    md: 7,
    lg: 9,
    xl: 10,
  },
  font: {
    xs: 10,
    sm: 11,
    body: 12,
    md: 13,
    lg: 14,
    xl: 15,
    title: 17,
    header: 18,
  },
  fontFamily: "'Segoe UI', system-ui, sans-serif",
};

/** Reusable style objects shared across components */
export const shared = {
  card: {
    background: theme.colors.bg.card,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  dashedInput: {
    width: '100%',
    padding: '5px 9px',
    border: `1px dashed ${theme.colors.border.dashed}`,
    borderRadius: theme.radius.sm,
    fontSize: theme.font.body,
    fontFamily: 'inherit',
    resize: 'vertical',
    background: theme.colors.bg.muted,
    boxSizing: 'border-box',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    borderBottom: `2px solid ${theme.colors.text.muted}`,
    paddingBottom: 5,
    marginBottom: 8,
  },
  subSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderBottom: `2px solid ${theme.colors.border.default}`,
    paddingBottom: 4,
    marginBottom: 8,
  },
  checkbox: {
    width: 17,
    height: 17,
    accentColor: theme.colors.accent.indigo,
    cursor: 'pointer',
    flexShrink: 0,
  },
};
