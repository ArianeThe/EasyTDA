import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TASKS: 'easytda_tasks',
  TIMER_SESSIONS: 'easytda_timer_sessions',
  CATEGORIES: 'easytda_categories',
  NOTIFICATIONS: 'easytda_notifications',
  APP_SETTINGS: 'easytda_app_settings',
} as const;

export const storageService = {
  // Generic get
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  // Generic set
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key}:`, error);
    }
  },

  // Generic remove
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  // Clear all
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

