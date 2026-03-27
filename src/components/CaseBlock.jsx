import { memo } from 'react';
import { theme } from '../theme';

/** Case study description block */
const CaseBlock = memo(({ caseText, greyed }) => (
  <div
    style={{
      background: theme.colors.case.bg,
      border: `1px solid ${theme.colors.case.border}`,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      whiteSpace: 'pre-wrap',
      fontSize: theme.font.body,
      lineHeight: 1.7,
      color: theme.colors.case.text,
      opacity: greyed ? 0.55 : 1,
    }}
  >
    <span style={{ fontWeight: 700 }}>Case: </span>
    {caseText}
  </div>
));

CaseBlock.displayName = 'CaseBlock';
export default CaseBlock;
