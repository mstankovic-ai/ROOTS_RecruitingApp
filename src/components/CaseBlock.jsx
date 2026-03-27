import { memo } from 'react';
import { theme } from '../theme';

const CaseBlock = memo(({ caseText, greyed }) => (
  <div
    style={{
      background: theme.colors.case.bg,
      border: `1px solid ${theme.colors.case.border}`,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.sm + 4,
      whiteSpace: 'pre-wrap',
      fontSize: theme.font.body,
      lineHeight: 1.8,
      color: theme.colors.case.text,
      opacity: greyed ? 0.5 : 1,
      boxShadow: theme.shadow.sm,
    }}
  >
    <div
      style={{
        fontSize: theme.font.xs,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: theme.colors.case.text,
        marginBottom: theme.spacing.sm,
        opacity: 0.7,
      }}
    >
      Case-Beschreibung
    </div>
    {caseText}
  </div>
));

CaseBlock.displayName = 'CaseBlock';
export default CaseBlock;
