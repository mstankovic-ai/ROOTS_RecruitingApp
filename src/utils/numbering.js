import { SECTIONS } from '../data/sections';

/**
 * Computes dynamic section numbering based on visibility (erst/zweit).
 * @param {boolean} isZweit - Whether this is a second interview
 * @returns {Array<{ mainNumber: number|null, subNumber: string|null, visible: boolean }>}
 */
export const computeSectionNumbers = (isZweit) => {
  let mainNum = 0;
  let subNum = 0;
  let parentNum = 0;

  return SECTIONS.map((section) => {
    const visible = !(section.erstOnly && isZweit);
    let mainNumber = null;
    let subNumber = null;

    if (visible && section.main) {
      mainNum += 1;
      subNum = 0;
      mainNumber = mainNum;
      parentNum = mainNum;
    }
    if (visible && section.sub) {
      subNum += 1;
      subNumber = `${parentNum}.${subNum}`;
    }

    return { mainNumber, subNumber, visible };
  });
};
