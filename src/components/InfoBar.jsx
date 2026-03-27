import { memo } from 'react';
import { theme } from '../theme';

/** Blue info bar below the header with usage instructions */
const InfoBar = memo(({ isZweit }) => (
  <div
    style={{
      background: theme.colors.info.bg,
      padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
      fontSize: theme.font.body,
      color: theme.colors.info.text,
      lineHeight: 1.5,
      borderBottom: `1px solid ${theme.colors.info.border}`,
    }}
    className="no-print"
  >
    &#9432; Wähle pro Phase Fragen aus, hake gestellte ab, notiere Stichworte und bewerte per
    ausklappbarem Evaluationsanker.{' '}
    {isZweit &&
      'Grau hinterlegte Fragen wurden im Erstgespräch bereits gestellt. Bewertungen (EG) und Notizen (Notizen EG) sind übernommen. '}
    Offene Fragen kann der/die nächste Interviewer:in stellen.
  </div>
));

InfoBar.displayName = 'InfoBar';
export default InfoBar;
