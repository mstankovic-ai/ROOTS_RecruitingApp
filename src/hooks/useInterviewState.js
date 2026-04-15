import { useReducer, useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { mergeRatings, calculateDimensionScores, calculateWeightedOverall, DEFAULT_WEIGHTS } from '../utils/scoring';
import { computeSectionNumbers } from '../utils/numbering';
import { saveToStorage, loadFromStorage } from '../utils/storage';

/** Action types – readable and greppable */
const TOGGLE_CHECK = 'TOGGLE_CHECK';
const SET_NOTE = 'SET_NOTE';
const TOGGLE_OBSERVATION = 'TOGGLE_OBSERVATION';
const SET_RATING = 'SET_RATING';
const SET_META = 'SET_META';
const SET_GESAMT_NOTE = 'SET_GESAMT_NOTE';
const SET_RECOMMENDATION = 'SET_RECOMMENDATION';
const SET_ABSCHLUSS_NOTE = 'SET_ABSCHLUSS_NOTE';
const TOGGLE_RTI = 'TOGGLE_RTI';
const TOGGLE_CASE_CHECK = 'TOGGLE_CASE_CHECK';
const SET_ZWEIT_ANMERKUNG = 'SET_ZWEIT_ANMERKUNG';
const SET_CULTURE_FIT = 'SET_CULTURE_FIT';
const SET_TIMER = 'SET_TIMER';
const SET_WEIGHT = 'SET_WEIGHT';
const LOAD_STATE = 'LOAD_STATE';
const RESET_STATE = 'RESET_STATE';

const generateSessionId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const INITIAL_STATE = {
  checks: {},
  notes: {},
  observations: {},
  ratings: {},
  meta: { kandidat: '', interviewer: '', datum: '', runde: 'erst', sessionId: '' },
  gesamtNote: '',
  recommendation: '',
  abschlussNotes: {},
  rtiDone: false,
  caseChecks: {},
  zweitAnmerkung: '',
  cultureFitAnswers: {},
  timerMinutes: {},
  weights: { ...DEFAULT_WEIGHTS },
};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHECK:
      return { ...state, checks: { ...state.checks, [action.questionId]: !state.checks[action.questionId] } };

    case SET_NOTE:
      return { ...state, notes: { ...state.notes, [action.questionId]: action.value } };

    case TOGGLE_OBSERVATION: {
      const current = { ...(state.observations[action.questionId] || {}) };
      current[action.index] = !current[action.index];
      return { ...state, observations: { ...state.observations, [action.questionId]: current } };
    }

    case SET_RATING: {
      const questionRatings = { ...(state.ratings[action.questionId] || {}) };
      questionRatings[action.evalIndex] = action.value;
      return { ...state, ratings: { ...state.ratings, [action.questionId]: questionRatings } };
    }

    case SET_META:
      return { ...state, meta: { ...state.meta, [action.field]: action.value } };

    case SET_GESAMT_NOTE:
      return { ...state, gesamtNote: action.value };

    case SET_RECOMMENDATION:
      return { ...state, recommendation: action.value };

    case SET_ABSCHLUSS_NOTE:
      return { ...state, abschlussNotes: { ...state.abschlussNotes, [action.key]: action.value } };

    case TOGGLE_RTI:
      return { ...state, rtiDone: !state.rtiDone };

    case TOGGLE_CASE_CHECK: {
      const updated = { ...state.caseChecks };
      updated[action.caseKey] = !updated[action.caseKey];
      return { ...state, caseChecks: updated };
    }

    case SET_ZWEIT_ANMERKUNG:
      return { ...state, zweitAnmerkung: action.value };

    case SET_CULTURE_FIT:
      return { ...state, cultureFitAnswers: { ...state.cultureFitAnswers, [action.questionId]: action.value } };

    case SET_TIMER:
      return { ...state, timerMinutes: { ...state.timerMinutes, [action.sectionId]: action.value } };

    case SET_WEIGHT:
      return { ...state, weights: { ...state.weights, [action.dimension]: action.value } };

    case LOAD_STATE:
      return { ...action.payload };

    case RESET_STATE:
      return { ...INITIAL_STATE, meta: { ...INITIAL_STATE.meta, sessionId: action.sessionId || generateSessionId() } };

    default:
      return state;
  }
};

/**
 * Central interview state hook.
 * Manages erst/zweit state, persistence, computed scores, and section numbering.
 */
export const useInterviewState = () => {
  const [erst, dispatchErst] = useReducer(reducer, INITIAL_STATE);
  const [zweit, dispatchZweit] = useReducer(reducer, INITIAL_STATE);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const saveTimerRef = useRef(null);
  const initialLoadDone = useRef(false);

  // Load from localStorage on mount, or generate fresh sessionId
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.erst) dispatchErst({ type: LOAD_STATE, payload: saved.erst });
      if (saved.zweit) dispatchZweit({ type: LOAD_STATE, payload: saved.zweit });
    } else {
      const sid = generateSessionId();
      dispatchErst({ type: SET_META, field: 'sessionId', value: sid });
      dispatchZweit({ type: SET_META, field: 'sessionId', value: sid });
    }
    initialLoadDone.current = true;
  }, []);

  const isZweit = erst.meta.runde === 'zweit';
  const currentState = isZweit ? zweit : erst;
  const canSwitchToZweit = erst.recommendation === 'Zum Zweitgespräch einladen';

  /** Unified dispatch that routes actions to the correct reducer */
  const dispatch = useCallback(
    (action) => {
      if (action.type === SET_META) {
        if (action.field === 'runde' && action.value === 'zweit' && !canSwitchToZweit) return;
        dispatchErst(action);
        dispatchZweit(action);
        return;
      }
      if (action.type === SET_ZWEIT_ANMERKUNG) {
        dispatchErst(action);
        return;
      }
      if (isZweit) {
        dispatchZweit(action);
      } else {
        dispatchErst(action);
      }
    },
    [isZweit, canSwitchToZweit],
  );

  // Debounced auto-save (300ms)
  // Track whether erst/zweit changed after initial load to trigger save
  const needsSave = useRef(false);
  useEffect(() => {
    if (!initialLoadDone.current) return;
    needsSave.current = true;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      if (needsSave.current) {
        setSaveStatus('saving');
        await saveToStorage({ erst, zweit });
        setSaveStatus('saved');
        needsSave.current = false;
      }
    }, 300);
    return () => clearTimeout(saveTimerRef.current);
  }, [erst, zweit]);

  const effectiveRatings = useMemo(
    () => (isZweit ? mergeRatings(erst.ratings, zweit.ratings) : currentState.ratings),
    [isZweit, erst.ratings, zweit.ratings, currentState.ratings],
  );

  const weights = currentState.weights || DEFAULT_WEIGHTS;

  const dimScores = useMemo(
    () => {
      const scores = calculateDimensionScores(effectiveRatings);
      scores.weightedOverall = calculateWeightedOverall(scores.averages, weights);
      return scores;
    },
    [effectiveRatings, weights],
  );

  const sectionNumbers = useMemo(
    () => computeSectionNumbers(isZweit),
    [isZweit],
  );

  /** Reset all data – generates new session, resets both reducers */
  const resetAll = useCallback(() => {
    const sid = generateSessionId();
    dispatchErst({ type: RESET_STATE, sessionId: sid });
    dispatchZweit({ type: RESET_STATE, sessionId: sid });
  }, []);

  /**
   * Load a specific candidate's data (e.g. from dashboard).
   * Pass { startZweit: true } to atomically switch to Zweitgespräch while loading,
   * bypassing the stale-closure issue of dispatching SET_META afterwards.
   */
  const loadCandidate = useCallback((data, options = {}) => {
    const startZweit = !!options.startZweit;
    if (data.erst) {
      const payload = startZweit
        ? { ...data.erst, meta: { ...(data.erst.meta || {}), runde: 'zweit' } }
        : data.erst;
      dispatchErst({ type: LOAD_STATE, payload });
    }
    if (data.zweit) {
      const payload = startZweit
        ? { ...data.zweit, meta: { ...(data.zweit.meta || {}), runde: 'zweit' } }
        : data.zweit;
      dispatchZweit({ type: LOAD_STATE, payload });
    }
  }, []);

  return {
    erst,
    zweit,
    currentState,
    isZweit,
    canSwitchToZweit,
    dispatch,
    effectiveRatings,
    dimScores,
    sectionNumbers,
    saveStatus,
    resetAll,
    loadCandidate,
  };
};

// Export action creators for clean component code
export const actions = {
  toggleCheck: (questionId) => ({ type: TOGGLE_CHECK, questionId }),
  setNote: (questionId, value) => ({ type: SET_NOTE, questionId, value }),
  toggleObservation: (questionId, index) => ({ type: TOGGLE_OBSERVATION, questionId, index }),
  setRating: (questionId, evalIndex, value) => ({ type: SET_RATING, questionId, evalIndex, value }),
  setMeta: (field, value) => ({ type: SET_META, field, value }),
  setGesamtNote: (value) => ({ type: SET_GESAMT_NOTE, value }),
  setRecommendation: (value) => ({ type: SET_RECOMMENDATION, value }),
  setAbschlussNote: (key, value) => ({ type: SET_ABSCHLUSS_NOTE, key, value }),
  toggleRti: () => ({ type: TOGGLE_RTI }),
  toggleCaseCheck: (caseKey) => ({ type: TOGGLE_CASE_CHECK, caseKey }),
  setZweitAnmerkung: (value) => ({ type: SET_ZWEIT_ANMERKUNG, value }),
  setCultureFit: (questionId, value) => ({ type: SET_CULTURE_FIT, questionId, value }),
  setTimer: (sectionId, value) => ({ type: SET_TIMER, sectionId, value }),
  setWeight: (dimension, value) => ({ type: SET_WEIGHT, dimension, value }),
};
