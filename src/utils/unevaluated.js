import { SECTIONS_ERST } from '../data/sections';

/**
 * Mapping from Erst section IDs to Zweit section IDs by topic.
 * Unevaluated questions from an Erst section appear inside the matching Zweit section.
 */
const ERST_TO_ZWEIT_TOPIC = {
  's3': 's3',           // Selbstvorstellung -> Selbstvorstellung
  's4': 's4_zweit',     // Motivation -> Motivation
  's5_erst': 's5_zweit', // Erfahrungen & Fit -> Erfahrungen & Fit
  's12': null,          // Mini Case A -> no Zweit equivalent (suppressed)
  's_cf': null,         // Culture-Fit -> shown standalone
  's15': 's15',         // Nachfragen -> Nachfragen
};

/**
 * Returns unevaluated questions from the Erstgespräch, grouped by their
 * target Zweit section ID. Questions without a mapping go to '_unmatched'.
 */
export const getUnevaluatedBySection = (erstRatings) => {
  const result = {};
  for (const section of SECTIONS_ERST) {
    const targetSectionId = ERST_TO_ZWEIT_TOPIC[section.id] || '_unmatched';

    // Check block evaluations
    if (section.blockEvaluation) {
      const be = section.blockEvaluation;
      const beRatings = erstRatings[be.id] || {};
      const allRated = be.evaluations.every((_, i) => beRatings[i] != null);
      if (!allRated && section.questions) {
        if (!result[targetSectionId]) result[targetSectionId] = [];
        for (const q of section.questions) {
          result[targetSectionId].push({ question: q, sectionMain: section.main, hasEvals: false });
        }
      }
      continue;
    }
    // Check regular questions
    if (!section.questions) continue;
    for (const q of section.questions) {
      if (!q.evaluations || q.evaluations.length === 0) continue;
      const qRatings = erstRatings[q.id] || {};
      const allRated = q.evaluations.every((_, i) => qRatings[i] != null);
      if (!allRated) {
        if (!result[targetSectionId]) result[targetSectionId] = [];
        result[targetSectionId].push({ question: q, sectionMain: section.main || section.sub, hasEvals: true });
      }
    }
  }
  return result;
};
