import { PomodoroSettings, TimerSession } from '@/types/timerSession';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Type State
export interface TimerState {
  currentSession?: TimerSession;
  sessions: TimerSession[];
  pomodoroSettings: PomodoroSettings;
  isRunning: boolean;
  isPaused: boolean;
  loading: boolean;
  error?: string;
}

// Type Action
export type TimerAction =
  | { type: 'START_SESSION'; payload: TimerSession }
  | { type: 'PAUSE_SESSION' }
  | { type: 'RESUME_SESSION' }
  | { type: 'STOP_SESSION' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'UPDATE_SESSION'; payload: Partial<TimerSession> }
  | { type: 'SET_SESSIONS'; payload: TimerSession[] }
  | { type: 'ADD_SESSION'; payload: TimerSession }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'UPDATE_POMODORO_SETTINGS'; payload: Partial<PomodoroSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'RESET' };

// Default Pomodoro Settings
const defaultPomodoroSettings: PomodoroSettings = {
  workDuration: 25,
  breakDuration: 5,
  sessionsBeforeLongBreak: 4,
  longBreakDuration: 15,
};

// Initial State
const initialState: TimerState = {
  sessions: [],
  pomodoroSettings: defaultPomodoroSettings,
  isRunning: false,
  isPaused: false,
  loading: false,
};

// Reducer
const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        currentSession: action.payload,
        isRunning: true,
        isPaused: false,
        error: undefined,
      };

    case 'PAUSE_SESSION':
      return {
        ...state,
        isRunning: false,
        isPaused: true,
        currentSession: state.currentSession
          ? {
              ...state.currentSession,
              isPaused: true,
              pausedAt: Date.now(),
            }
          : undefined,
      };

    case 'RESUME_SESSION':
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        currentSession: state.currentSession
          ? {
              ...state.currentSession,
              isPaused: false,
              pausedAt: undefined,
            }
          : undefined,
      };

    case 'STOP_SESSION':
      return {
        ...state,
        currentSession: undefined,
        isRunning: false,
        isPaused: false,
        error: undefined,
      };

    case 'COMPLETE_SESSION':
      if (!state.currentSession) return state;
      const completedSession = {
        ...state.currentSession,
        isRunning: false,
        completedAt: Date.now(),
      };
      return {
        ...state,
        currentSession: undefined,
        sessions: [...state.sessions, completedSession],
        isRunning: false,
        isPaused: false,
        error: undefined,
      };

    case 'UPDATE_SESSION':
      return {
        ...state,
        currentSession: state.currentSession
          ? { ...state.currentSession, ...action.payload }
          : undefined,
      };

    case 'SET_SESSIONS':
      return {
        ...state,
        sessions: action.payload,
        error: undefined,
      };

    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
        error: undefined,
      };

    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session.id !== action.payload
        ),
        currentSession:
          state.currentSession?.id === action.payload
            ? undefined
            : state.currentSession,
        error: undefined,
      };

    case 'UPDATE_POMODORO_SETTINGS':
      return {
        ...state,
        pomodoroSettings: {
          ...state.pomodoroSettings,
          ...action.payload,
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

// Context
interface TimerContextType {
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Provider
export const TimerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

// Hook
export const useTimerContext = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within TimerProvider');
  }
  return context;
};

