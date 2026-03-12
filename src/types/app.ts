import { NotificationPreferences } from './notification';
import { PomodoroSettings } from './timerSession';

export interface AppTheme {
  mode: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  accentColor?: string;
}

export interface AppSettings {
  theme: AppTheme;
  pomodoroSettings: PomodoroSettings;
  notificationPreferences: NotificationPreferences;
  language: 'en' | 'fr' | 'es';
  timezone?: string;
}

export interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  error?: string;
  settings: AppSettings;
  userPreferences?: Record<string, any>;
}
