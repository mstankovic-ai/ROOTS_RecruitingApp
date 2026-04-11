import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_PREFIX = 'roots-interview-';

/* ──────────────────────────────────────────────
   localStorage helpers (fallback / offline cache)
   ────────────────────────────────────────────── */

const makeLocalKey = (meta) => {
  const name = (meta?.kandidat || '').trim().replace(/\s+/g, '-').toLowerCase();
  const date = meta?.datum || '';
  const sid = meta?.sessionId || '';
  if (name && date && sid) return `${STORAGE_PREFIX}${name}-${date}-${sid}`;
  if (name && date) return `${STORAGE_PREFIX}${name}-${date}`;
  if (name) return `${STORAGE_PREFIX}${name}`;
  return `${STORAGE_PREFIX}draft`;
};

let previousKey = null;

const saveToLocalStorage = (data) => {
  try {
    const key = makeLocalKey(data.erst?.meta);
    if (previousKey && previousKey !== key) {
      localStorage.removeItem(previousKey);
    }
    previousKey = key;
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${STORAGE_PREFIX}last-key`, key);
  } catch {
    // localStorage full or unavailable
  }
};

const loadFromLocalStorage = () => {
  try {
    const lastKey = localStorage.getItem(`${STORAGE_PREFIX}last-key`);
    if (!lastKey) return null;
    previousKey = lastKey;
    const raw = localStorage.getItem(lastKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getAllFromLocalStorage = () => {
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

/* ──────────────────────────────────────────────
   Supabase helpers
   ────────────────────────────────────────────── */

const toRow = (data) => {
  const erst = data.erst || {};
  const zweit = data.zweit || {};
  const meta = erst.meta || {};
  return {
    session_id: meta.sessionId || '',
    kandidat: meta.kandidat || '',
    interviewer: meta.interviewer || '',
    datum: meta.datum || '',
    runde: meta.runde || 'erst',
    erst: erst,
    zweit: zweit,
    recommendation: (meta.runde === 'zweit' ? zweit.recommendation : erst.recommendation) || null,
    weighted_overall: data._weightedOverall ?? null,
  };
};

const fromRow = (row) => ({
  key: row.id,
  data: {
    erst: row.erst || {},
    zweit: row.zweit || {},
  },
});

/* ──────────────────────────────────────────────
   Public API – Supabase first, localStorage fallback
   ────────────────────────────────────────────── */

/**
 * Saves interview state. Writes to Supabase (upsert by session_id)
 * and also mirrors to localStorage for offline caching.
 */
export const saveToStorage = async (data) => {
  // Always save locally for immediate access / offline
  saveToLocalStorage(data);

  if (!isSupabaseConfigured()) return;

  try {
    const row = toRow(data);
    if (!row.session_id) return;

    await supabase
      .from('interviews')
      .upsert(row, { onConflict: 'session_id' });
  } catch {
    // Supabase unavailable – localStorage has the data
  }
};

/**
 * Loads the most recent interview for the current session.
 * Tries localStorage first (instant), then Supabase.
 */
export const loadFromStorage = () => {
  // For initial load, just use localStorage (fast, synchronous)
  return loadFromLocalStorage();
};

/**
 * Returns all saved candidate interviews.
 * Merges Supabase (authoritative) with localStorage (offline buffer).
 */
export const getAllCandidates = async () => {
  if (!isSupabaseConfigured()) {
    return getAllFromLocalStorage();
  }

  try {
    const { data: rows, error } = await supabase
      .from('interviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (rows || []).map(fromRow);
  } catch {
    // Fallback to localStorage
    return getAllFromLocalStorage();
  }
};

/**
 * Removes a single candidate interview.
 */
export const removeCandidate = async (storageKey) => {
  // Remove from localStorage
  try {
    localStorage.removeItem(storageKey);
    const lastKey = localStorage.getItem(`${STORAGE_PREFIX}last-key`);
    if (lastKey === storageKey) {
      localStorage.removeItem(`${STORAGE_PREFIX}last-key`);
    }
  } catch {
    // localStorage unavailable
  }

  if (!isSupabaseConfigured()) return;

  try {
    // storageKey from Supabase is the UUID
    await supabase
      .from('interviews')
      .delete()
      .eq('id', storageKey);
  } catch {
    // Supabase unavailable
  }
};

/**
 * Clears all ROOTS interview data.
 */
export const clearAllStorage = async () => {
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

  // Note: we do NOT clear Supabase on reset – only local state resets
};

/**
 * Exports state as a downloadable JSON file.
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
 * Exports interview as a readable Markdown report.
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

/**
 * Subscribe to realtime changes on the interviews table.
 * Returns an unsubscribe function.
 */
export const subscribeToInterviews = (callback) => {
  if (!isSupabaseConfigured()) return () => {};

  const channel = supabase
    .channel('interviews-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'interviews' },
      () => {
        // Refetch all candidates when any change happens
        callback();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
