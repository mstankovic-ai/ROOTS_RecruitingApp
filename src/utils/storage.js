const STORAGE_PREFIX = 'roots-interview-';

/**
 * Generates a localStorage key from candidate name and date.
 * Falls back to 'draft' if no meta is available.
 */
const makeKey = (meta) => {
  const name = (meta?.kandidat || '').trim().replace(/\s+/g, '-').toLowerCase();
  const date = meta?.datum || '';
  if (name && date) return `${STORAGE_PREFIX}${name}-${date}`;
  if (name) return `${STORAGE_PREFIX}${name}`;
  return `${STORAGE_PREFIX}draft`;
};

/**
 * Saves interview state to localStorage.
 * @param {{ erst: Object, zweit: Object }} data
 */
export const saveToStorage = (data) => {
  try {
    const key = makeKey(data.erst?.meta);
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${STORAGE_PREFIX}last-key`, key);
  } catch {
    // localStorage full or unavailable – silently fail
  }
};

/**
 * Loads the most recent interview state from localStorage.
 * @returns {{ erst: Object, zweit: Object } | null}
 */
export const loadFromStorage = () => {
  try {
    const lastKey = localStorage.getItem(`${STORAGE_PREFIX}last-key`);
    if (!lastKey) return null;
    const raw = localStorage.getItem(lastKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Exports state as a downloadable JSON file.
 * @param {Object} data - Full interview data
 * @param {string} filename - Desired filename
 */
export const exportAsJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Returns all saved candidate interviews from localStorage.
 * @returns {Array<{ key: string, data: Object }>}
 */
export const getAllCandidates = () => {
  const results = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX) && !key.endsWith('-last-key')) {
        try {
          const raw = localStorage.getItem(key);
          const data = JSON.parse(raw);
          if (data && data.erst) {
            results.push({ key, data });
          }
        } catch {
          // skip corrupt entries
        }
      }
    }
  } catch {
    // localStorage unavailable
  }
  return results;
};

/**
 * Clears all ROOTS interview data from localStorage.
 */
export const clearAllStorage = () => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // localStorage unavailable
  }
};

/**
 * Removes a single candidate entry from localStorage.
 * @param {string} storageKey
 */
export const removeCandidate = (storageKey) => {
  try {
    localStorage.removeItem(storageKey);
    const lastKey = localStorage.getItem(`${STORAGE_PREFIX}last-key`);
    if (lastKey === storageKey) {
      localStorage.removeItem(`${STORAGE_PREFIX}last-key`);
    }
  } catch {
    // localStorage unavailable
  }
};

/**
 * Exports interview as a readable Markdown report.
 * @param {Object} data - Full interview data including scores
 * @returns {string} Markdown text
 */
export const exportAsMarkdown = (data) => {
  const { erst, zweit, scores } = data;
  const meta = erst.meta;
  const isZweit = meta.runde === 'zweit';
  const state = isZweit ? zweit : erst;

  let md = `# ROOTS Interview – ${meta.kandidat || 'Unbenannt'}\n\n`;
  md += `- **Datum:** ${meta.datum || '–'}\n`;
  md += `- **Interviewer:** ${meta.interviewer || '–'}\n`;
  md += `- **Runde:** ${isZweit ? 'Zweitgespräch' : 'Erstgespräch'}\n\n`;

  if (scores?.averages) {
    md += `## Dimension Scores\n\n`;
    for (const [key, avg] of Object.entries(scores.averages)) {
      md += `- **${key}:** ${avg.toFixed(1)}\n`;
    }
    if (scores.overall != null) {
      md += `\n**Gesamtscore:** ${scores.overall.toFixed(1)} / 5.0\n\n`;
    }
  }

  if (state.gesamtNote) {
    md += `## Gesamteindruck\n\n${state.gesamtNote}\n\n`;
  }

  if (state.recommendation) {
    md += `## Empfehlung\n\n${state.recommendation}\n\n`;
  }

  return md;
};
