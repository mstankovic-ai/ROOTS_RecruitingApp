import { memo, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { theme } from '../theme';
import { getSections } from '../data/sections';

/** Parse "X Min." or "X–Y Min." to get the first number */
const parseMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const GlobalTimer = memo(({ isZweit }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  const totalTargetMinutes = useMemo(() => {
    const sections = getSections(isZweit);
    return sections.reduce((sum, s) => sum + parseMinutes(s.time), 0);
  }, [isZweit]);

  const targetSeconds = totalTargetMinutes * 60;

  const startPause = useCallback(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setStarted(true);
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStarted(false);
    setElapsedSeconds(0);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const isOvertime = elapsedSeconds > targetSeconds;
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const display = `${mins}:${secs.toString().padStart(2, '0')}`;
  const diff = elapsedSeconds - targetSeconds;
  const absDiff = Math.abs(diff);
  const diffMins = Math.floor(absDiff / 60);
  const diffSecs = absDiff % 60;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px',
        borderRadius: theme.radius.md,
        background: isOvertime ? 'rgba(220, 38, 38, 0.06)' : 'rgba(99, 102, 241, 0.06)',
        border: `1px solid ${isOvertime ? 'rgba(220, 38, 38, 0.15)' : 'rgba(99, 102, 241, 0.15)'}`,
        transition: `all ${theme.transition.normal}`,
      }}
      className="no-print"
    >
      <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontWeight: 500 }}>
        Gesamt
      </span>

      <span style={{
        fontFamily: theme.fontMono,
        fontSize: theme.font.lg,
        fontWeight: 800,
        color: isOvertime ? theme.colors.danger.text : theme.colors.accent.indigo,
        minWidth: 56,
        textAlign: 'center',
      }}>
        {started ? display : '0:00'}
      </span>

      <span style={{ fontSize: theme.font.xs, color: theme.colors.text.muted, fontFamily: theme.fontMono }}>
        / {totalTargetMinutes} Min.
      </span>

      {started && (
        <span style={{
          fontSize: theme.font.xs,
          fontWeight: 700,
          fontFamily: theme.fontMono,
          color: isOvertime ? theme.colors.danger.text : theme.colors.success.text,
          padding: '2px 6px',
          borderRadius: theme.radius.sm,
          background: isOvertime ? 'rgba(220, 38, 38, 0.08)' : 'rgba(34, 197, 94, 0.08)',
        }}>
          {diff <= 0 ? `-${diffMins}:${diffSecs.toString().padStart(2, '0')}` : `+${diffMins}:${diffSecs.toString().padStart(2, '0')}`}
        </span>
      )}

      <button
        onClick={startPause}
        style={{
          width: 26, height: 26, borderRadius: theme.radius.sm,
          border: `1px solid ${theme.colors.border.glass}`,
          background: isRunning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(99, 102, 241, 0.08)',
          color: isRunning ? '#B45309' : theme.colors.accent.indigo,
          cursor: 'pointer', fontSize: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0,
        }}
        title={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? '\u275A\u275A' : '\u25B6'}
      </button>

      {started && (
        <button
          onClick={reset}
          style={{
            width: 26, height: 26, borderRadius: theme.radius.sm,
            border: `1px solid ${theme.colors.border.glass}`,
            background: theme.colors.bg.muted,
            color: theme.colors.text.muted,
            cursor: 'pointer', fontSize: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}
          title="Reset"
        >
          ↺
        </button>
      )}
    </div>
  );
});

GlobalTimer.displayName = 'GlobalTimer';
export default GlobalTimer;
