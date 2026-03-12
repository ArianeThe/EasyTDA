import { useTimerContext } from '@/context/TimerContext';
import { STORAGE_KEYS, storageService } from '@/services/storage';
import { TimerSession } from '@/types/timerSession';
import { useCallback, useEffect, useRef } from 'react';

export const useTimer = () => {
  const { state, dispatch } = useTimerContext();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load sessions from storage
  const loadSessions = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const sessions = await storageService.getItem<TimerSession[]>(
        STORAGE_KEYS.TIMER_SESSIONS
      );
      dispatch({ type: 'SET_SESSIONS', payload: sessions || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load timer sessions' });
    }
  }, [dispatch]);

  // Save sessions to storage
  const saveSessions = useCallback(async () => {
    try {
      await storageService.setItem(STORAGE_KEYS.TIMER_SESSIONS, state.sessions);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save sessions' });
    }
  }, [state.sessions, dispatch]);

  // Start timer
  const startTimer = useCallback(
    (duration: number, taskId?: string, type: 'pomodoro' | 'custom' | 'break' = 'custom') => {
      const session: TimerSession = {
        id: `timer_${Date.now()}`,
        taskId,
        type,
        duration,
        elapsed: 0,
        isRunning: true,
        isPaused: false,
        completedPomodoros: 0,
        startedAt: Date.now(),
      };
      dispatch({ type: 'START_SESSION', payload: session });
    },
    [dispatch]
  );

  // Pause timer
  const pauseTimer = useCallback(() => {
    dispatch({ type: 'PAUSE_SESSION' });
  }, [dispatch]);

  // Resume timer
  const resumeTimer = useCallback(() => {
    dispatch({ type: 'RESUME_SESSION' });
  }, [dispatch]);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch({ type: 'STOP_SESSION' });
  }, [dispatch]);

  // Complete timer
  const completeTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch({ type: 'COMPLETE_SESSION' });
    saveSessions();
  }, [dispatch, saveSessions]);

  // Set duration
  const setDuration = useCallback(
    (duration: number) => {
      if (state.currentSession) {
        dispatch({
          type: 'UPDATE_SESSION',
          payload: { duration },
        });
      }
    },
    [state.currentSession, dispatch]
  );

  // Handle Pomodoro cycle
  const handlePomodoroCycle = useCallback(() => {
    if (!state.currentSession) return;

    const { type, completedPomodoros } = state.currentSession;
    const { sessionsBeforeLongBreak, longBreakDuration, breakDuration } =
      state.pomodoroSettings;

    if (type === 'pomodoro') {
      const newPomodoros = completedPomodoros + 1;
      const isLongBreak =
        newPomodoros % sessionsBeforeLongBreak === 0;
      const breakDur = isLongBreak ? longBreakDuration : breakDuration;

      // Start break
      const breakSession: TimerSession = {
        id: `timer_${Date.now()}`,
        type: 'break',
        duration: breakDur,
        elapsed: 0,
        isRunning: true,
        isPaused: false,
        completedPomodoros: newPomodoros,
        startedAt: Date.now(),
      };
      dispatch({ type: 'START_SESSION', payload: breakSession });
    }
  }, [state.currentSession, state.pomodoroSettings, dispatch]);

  // Update elapsed time (runs in background)
  useEffect(() => {
    if (state.isRunning && state.currentSession) {
      intervalRef.current = setInterval(() => {
        dispatch({
          type: 'UPDATE_SESSION',
          payload: { elapsed: state.currentSession!.elapsed + 1 },
        });

        // Check if timer is complete
        if (state.currentSession) {
          const elapsedMinutes = (state.currentSession.elapsed + 1) / 60;
          if (elapsedMinutes >= state.currentSession.duration) {
            completeTimer();
            handlePomodoroCycle();
          }
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isRunning, state.currentSession, dispatch, completeTimer, handlePomodoroCycle]);

  return {
    // State
    currentSession: state.currentSession,
    sessions: state.sessions,
    pomodoroSettings: state.pomodoroSettings,
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    loading: state.loading,
    error: state.error,

    // Actions
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    completeTimer,
    setDuration,
    handlePomodoroCycle,
    loadSessions,
    saveSessions,
  };
};

