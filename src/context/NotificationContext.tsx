import { Notification, NotificationPreferences } from '@/types/notification';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Type State
export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  loading: boolean;
  error?: string;
}

// Type Action
export type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_NOTIFICATION'; payload: Notification }
  | { type: 'DELETE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'REMOVE_EXPIRED' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<NotificationPreferences> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'RESET' };

// Default Notification Preferences
const defaultPreferences: NotificationPreferences = {
  enableTaskReminders: true,
  enableTimerAlarms: true,
  enableCompletionNotifications: true,
  notificationTime: 15,
};

// Initial State
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  preferences: defaultPreferences,
  loading: false,
};

// Reducer
const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotifications = [...state.notifications, action.payload];
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newNotifications.filter((n) => !n.read).length,
        error: undefined,
      };

    case 'UPDATE_NOTIFICATION':
      const updatedNotifications = state.notifications.map((notif) =>
        notif.id === action.payload.id ? action.payload : notif
      );
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
        error: undefined,
      };

    case 'DELETE_NOTIFICATION':
      const filteredNotifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.filter((n) => !n.read).length,
        error: undefined,
      };

    case 'MARK_AS_READ':
      const markedNotifications = state.notifications.map((notif) =>
        notif.id === action.payload ? { ...notif, read: true } : notif
      );
      return {
        ...state,
        notifications: markedNotifications,
        unreadCount: markedNotifications.filter((n) => !n.read).length,
      };

    case 'MARK_ALL_AS_READ':
      const allReadNotifications = state.notifications.map((notif) => ({
        ...notif,
        read: true,
      }));
      return {
        ...state,
        notifications: allReadNotifications,
        unreadCount: 0,
      };

    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.read).length,
        error: undefined,
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
        error: undefined,
      };

    case 'REMOVE_EXPIRED':
      const now = Date.now();
      const nonExpiredNotifications = state.notifications.filter(
        (notif) => !notif.expiresAt || notif.expiresAt > now
      );
      return {
        ...state,
        notifications: nonExpiredNotifications,
        unreadCount: nonExpiredNotifications.filter((n) => !n.read).length,
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
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
interface NotificationContextType {
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Provider
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within NotificationProvider'
    );
  }
  return context;
};

