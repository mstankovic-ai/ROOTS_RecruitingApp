import { DIMENSIONS } from '../data/dimensions';
import { SECTIONS } from '../data/sections';

/**
 * Merges erst- and zweit-ratings. Zweit-ratings override erst-ratings per question/eval.
 * @param {Object} erstRatings - Ratings from first interview
 * @param {Object} zweitRatings - Ratings from second interview
 * @returns {Object} Merged ratings keyed by question ID
 */
export const mergeRatings = (erstRatings, zweitRatings) => {
  const merged = {};
  for (const [questionId, evals] of Object.entries(erstRatings)) {
    merged[questionId] = { ...evals };
  }
  for (const [questionId, evals] of Object.entries(zweitRatings)) {
    if (!merged[questionId]) merged[questionId] = {};
    for (const [evalIdx, value] of Object.entries(evals)) {
      merged[questionId][evalIdx] = value;
    }
  }
  return merged;
};

/**
 * Calculates per-dimension average scores and an overall average.
 * @param {Object} effectiveRatings - Merged ratings keyed by question ID
 * @returns {{ perDimension: Object, averages: Object, overall: number|null }}
 */
export const calculateDimensionScores = (effectiveRatings) => {
  const perDimension = {};
  for (const key of Object.keys(DIMENSIONS)) {
    perDimension[key] = { sum: 0, count: 0 };
  }

  for (const section of SECTIONS) {
    if (!section.questions) continue;
    for (const question of section.questions) {
      const questionRatings = effectiveRatings[question.id] || {};
      if (!question.evaluations) continue;
      question.evaluations.forEach((evaluation, evalIdx) => {
        const rating = questionRatings[evalIdx];
        if (rating != null) {
          perDimension[evaluation.dimension].sum += rating;
          perDimension[evaluation.dimension].count += 1;
        }
      });
    }
  }

  const averages = {};
  let totalSum = 0;
  let totalCount = 0;
  for (const key of Object.keys(DIMENSIONS)) {
    if (perDimension[key].count > 0) {
      averages[key] = perDimension[key].sum / perDimension[key].count;
      totalSum += averages[key];
      totalCount += 1;
    }
  }

  return {
    perDimension,
    averages,
    overall: totalCount > 0 ? totalSum / totalCount : null,
  };
};
