import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { theme } from '../theme';

/** Parse "X Min." or "X–Y Min." to get the first number as default minutes */
const parseDefaultMinutes = (timeStr) => {
  if (!timeStr) return 5;
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
};

const SectionTimer = memo(({ sectionId, timeStr, timerMinutes, dispatch, setTimer }) => {
  const defaultMin = parseDefaultMinutes(timeStr);
  const configuredMin = timerMinutes?.[sectionId] ?? defaultMin;

  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(configuredMin * 60);
  const [isEditing, setIsEditing] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);
  const prevConfiguredMin = useRef(configuredMin);

  // Sync remaining seconds when configured minutes change (before timer starts)
  if (prevConfiguredMin.current !== configuredMin) {
    prevConfiguredMin.current = configuredMin;
    if (!started) {
      setRemainingSeconds(configuredMin * 60);
    }
  }

  const startPause = useCallback(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setStarted(true);
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStarted(false);
    setRemainingSeconds(configuredMin * 60);
  }, [configuredMin]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const isOvertime = remainingSeconds < 0;
  const absSeconds = Math.abs(remainingSeconds);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  const display = `${isOvertime ? '-' : ''}${mins}:${secs.toString().padStart(2, '0')}`;

  const handleMinutesChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0 && val <= 120) {
      dispatch(setTimer(sectionId, val));
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Editable minutes (before start) */}
      {!started && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {isEditing ? (
            <input
              type="number"
              min={1}
              max={120}
              value={configuredMin}
              onChange={handleMinutesChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
              style={{
                width: 44, height: 28, textAlign: 'center',
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${theme.colors.accent.indigo}60`,
                borderRadius: theme.radius.sm,
                color: theme.colors.text.primary,
                fontSize: theme.font.sm,
                fontFamily: theme.fontMono,
                outline: 'none',
              }}
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              style={{
                fontSize: theme.font.xs, color: theme.colors.text.muted,
                padding: '3px 8px', borderRadius: theme.radius.sm,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${theme.colors.border.glass}`,
                cursor: 'pointer', fontFamily: theme.fontMono,
              }}
              title="Klicken zum Ändern"
            >
              {configuredMin} Min.
            </span>
          )}
        </div>
      )}

      {/* Timer display */}
      <span style={{
        fontFamily: theme.fontMono,
        fontSize: theme.font.md,
        fontWeight: 700,
        color: isOvertime ? theme.colors.danger.text : (remainingSeconds <= 60 && isRunning ? '#FBBF24' : theme.colors.text.primary),
        minWidth: 52,
        textAlign: 'center',
        textShadow: isOvertime ? `0 0 8px ${theme.colors.danger.text}50` : 'none',
        transition: `color ${theme.transition.fast}`,
      }}>
        {started ? display : ''}
      </span>

      {/* Start/Pause button */}
      <button
        onClick={startPause}
        style={{
          width: 28, height: 28, borderRadius: theme.radius.sm,
          border: `1px solid ${theme.colors.border.glass}`,
          background: isRunning ? 'rgba(251, 191, 36, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          color: isRunning ? '#FBBF24' : theme.colors.accent.indigoMid,
          cursor: 'pointer', fontSize: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: `all ${theme.transition.fast}`,
        }}
        title={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? '❚❚' : '▶'}
      </button>

      {/* Reset button */}
      {started && (
        <button
          onClick={reset}
          style={{
            width: 28, height: 28, borderRadius: theme.radius.sm,
            border: `1px solid ${theme.colors.border.glass}`,
            background: 'rgba(255,255,255,0.04)',
            color: theme.colors.text.muted,
            cursor: 'pointer', fontSize: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, transition: `all ${theme.transition.fast}`,
          }}
          title="Reset"
        >
          ↺
        </button>
      )}
    </div>
  );
});

SectionTimer.displayName = 'SectionTimer';
export default SectionTimer;
