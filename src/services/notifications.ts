import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set default notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  // Check if notifications are supported
  isSupported(): boolean {
    return Platform.OS !== 'web';
  },

  // Schedule notification (interval)
  async scheduleNotification(
    title: string,
    body: string,
    delay: number = 5000
  ): Promise<string | null> {
    if (!this.isSupported()) return null;

    try {
      return await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Math.max(1, Math.ceil(delay / 1000))
        },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  },

  // Schedule notification at specific date
  async scheduleNotificationAtDate(
    title: string,
    body: string,
    date: Date
  ): Promise<string | null> {
    if (!this.isSupported()) return null;

    // Don't schedule for past dates
    if (date.getTime() <= Date.now()) {
      return null;
    }

    try {
      return await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          data: { date: date.toISOString() },
        },
        trigger: date as any,
      });
    } catch (error) {
      console.error('Error scheduling notification at date:', error);
      return null;
    }
  },

  // Cancel notification
  async cancelNotification(notificationId: string): Promise<void> {
    if (!this.isSupported()) return;

    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  },

  // Cancel all notifications
  async cancelAllNotifications(): Promise<void> {
    if (!this.isSupported()) return;

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  },

  // Check permissions status
  async checkPermissions(): Promise<Notifications.PermissionStatus> {
    if (!this.isSupported()) return Notifications.PermissionStatus.UNDETERMINED;

    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Error checking permissions:', error);
      return Notifications.PermissionStatus.UNDETERMINED;
    }
  },

  // Request permissions
  async requestPermissions(): Promise<boolean> {
    if (!this.isSupported()) return false;

    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  },
};
