import { AppSettings, AppState } from '@/types/app';
import { NotificationPreferences } from '@/types/notification';
import { PomodoroSettings } from '@/types/timerSession';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Type Action
export type AppAction =
  | { type: 'INITIALIZE'; payload: Partial<AppState> }
  | { type: 'UPDATE_THEME'; payload: AppSettings['theme'] }
  | { type: 'UPDATE_POMODORO_SETTINGS'; payload: Partial<PomodoroSettings> }
  | { type: 'UPDATE_NOTIFICATION_PREFERENCES'; payload: Partial<NotificationPreferences> }
  | { type: 'UPDATE_LANGUAGE'; payload: 'en' | 'fr' | 'es' }
  | { type: 'UPDATE_TIMEZONE'; payload: string }
  | { type: 'SET_USER_PREFERENCES'; payload: Record<string, any> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'RESET' };

// Default Settings
const defaultAppSettings: AppSettings = {
  theme: {
    mode: 'auto',
  },
  pomodoroSettings: {
    workDuration: 25,
    breakDuration: 5,
    sessionsBeforeLongBreak: 4,
    longBreakDuration: 15,
  },
  notificationPreferences: {
    enableTaskReminders: true,
    enableTimerAlarms: true,
    enableCompletionNotifications: true,
    notificationTime: 15,
  },
  language: 'en',
};

// Initial State
const initialState: AppState = {
  isInitialized: false,
  isLoading: true,
  settings: defaultAppSettings,
  userPreferences: {},
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        ...action.payload,
        isInitialized: true,
        isLoading: false,
        error: undefined,
      };

    case 'UPDATE_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload,
        },
      };

    case 'UPDATE_POMODORO_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          pomodoroSettings: {
            ...state.settings.pomodoroSettings,
            ...action.payload,
          },
        },
      };

    case 'UPDATE_NOTIFICATION_PREFERENCES':
      return {
        ...state,
        settings: {
          ...state.settings,
          notificationPreferences: {
            ...state.settings.notificationPreferences,
            ...action.payload,
          },
        },
      };

    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload,
        },
      };

    case 'UPDATE_TIMEZONE':
      return {
        ...state,
        settings: {
          ...state.settings,
          timezone: action.payload,
        },
      };

    case 'SET_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

