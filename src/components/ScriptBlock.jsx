import { memo } from 'react';
import { theme, shared } from '../theme';
import { makeIntroErst, makeIntroZweit } from '../data/templates';

const ScriptBlock = memo(({ isZweit, kandidat, interviewer }) => {
  const text = isZweit
    ? makeIntroZweit(kandidat, interviewer)
    : makeIntroErst(kandidat, interviewer);

  return (
    <div style={{ ...shared.card, marginBottom: theme.spacing.sm + 4 }}>
      <div
        style={{
          fontSize: theme.font.xs,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: theme.colors.text.muted,
          marginBottom: theme.spacing.sm,
        }}
      >
        Vorlesetext
      </div>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: theme.font.body,
          lineHeight: 1.8,
          color: theme.colors.text.secondary,
        }}
      >
        {text}
      </div>
    </div>
  );
});

ScriptBlock.displayName = 'ScriptBlock';
export default ScriptBlock;
