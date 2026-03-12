export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  taskId?: string;
  read: boolean;
  createdAt: number; // timestamp
  expiresAt?: number; // timestamp
}

export interface NotificationPreferences {
  enableTaskReminders: boolean;
  enableTimerAlarms: boolean;
  enableCompletionNotifications: boolean;
  notificationTime: number; // minutes before task due time
}

