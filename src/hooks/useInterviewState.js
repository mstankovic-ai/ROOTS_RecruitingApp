import { useReducer, useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { mergeRatings, calculateDimensionScores } from '../utils/scoring';
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
const LOAD_STATE = 'LOAD_STATE';

const INITIAL_STATE = {
  checks: {},
  notes: {},
  observations: {},
  ratings: {},
  meta: { kandidat: '', interviewer: '', datum: '', runde: 'erst' },
  gesamtNote: '',
  recommendation: '',
  abschlussNotes: {},
  rtiDone: false,
  caseChecks: {},
  zweitAnmerkung: '',
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

    case LOAD_STATE:
      return { ...action.payload };

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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.erst) dispatchErst({ type: LOAD_STATE, payload: saved.erst });
      if (saved.zweit) dispatchZweit({ type: LOAD_STATE, payload: saved.zweit });
    }
    initialLoadDone.current = true;
  }, []);

  const isZweit = erst.meta.runde === 'zweit';
  const currentState = isZweit ? zweit : erst;
  const canSwitchToZweit = erst.recommendation === 'Zum Zweitgespräch einladen' || erst.recommendation === 'Auf Warteliste';

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
  useEffect(() => {
    if (!initialLoadDone.current) return;
    setSaveStatus('saving');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveToStorage({ erst, zweit });
      setSaveStatus('saved');
    }, 300);
    return () => clearTimeout(saveTimerRef.current);
  }, [erst, zweit]);

  const effectiveRatings = useMemo(
    () => (isZweit ? mergeRatings(erst.ratings, zweit.ratings) : currentState.ratings),
    [isZweit, erst.ratings, zweit.ratings, currentState.ratings],
  );

  const dimScores = useMemo(
    () => calculateDimensionScores(effectiveRatings),
    [effectiveRatings],
  );

  const sectionNumbers = useMemo(
    () => computeSectionNumbers(isZweit),
    [isZweit],
  );

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
};
