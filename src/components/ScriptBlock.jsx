import { memo } from 'react';
import { theme, shared } from '../theme';
import { makeIntroErst, makeIntroZweit } from '../data/templates';

/** Intro/Outro script text block */
const ScriptBlock = memo(({ isZweit, kandidat, interviewer }) => {
  const text = isZweit
    ? makeIntroZweit(kandidat, interviewer)
    : makeIntroErst(kandidat, interviewer);

  return (
    <div
      style={{
        ...shared.card,
        marginBottom: theme.spacing.sm,
        whiteSpace: 'pre-wrap',
        fontSize: theme.font.body,
        lineHeight: 1.7,
        color: theme.colors.text.secondary,
      }}
    >
      {text}
    </div>
  );
});

ScriptBlock.displayName = 'ScriptBlock';
export default ScriptBlock;
