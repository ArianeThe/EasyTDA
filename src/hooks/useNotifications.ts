import { useNotificationContext } from '@/context/NotificationContext';
import { notificationService } from '@/services/notifications';
import { STORAGE_KEYS, storageService } from '@/services/storage';
import { Notification } from '@/types/notification';
import { useCallback, useEffect } from 'react';

export const useNotifications = () => {
  const { state, dispatch } = useNotificationContext();
  const notificationIdsRef = new Map<string, string>();

  // Load notifications from storage
  const loadNotifications = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const notifications = await storageService.getItem<Notification[]>(
        STORAGE_KEYS.NOTIFICATIONS
      );
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications || [] });
      // Remove expired on load
      dispatch({ type: 'REMOVE_EXPIRED' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load notifications' });
    }
  }, [dispatch]);

  // Save notifications to storage
  const saveNotifications = useCallback(async () => {
    try {
      await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save notifications' });
    }
  }, [state.notifications, dispatch]);

  // Schedule notification
  const scheduleNotification = useCallback(
    async (title: string, message: string, delay: number = 5000, taskId?: string) => {
      try {
        // Schedule with actual notification service
        const nativeNotificationId = await notificationService.scheduleNotification(
          title,
          message,
          delay
        );

        // Add to state
        const notification: Notification = {
          id: `notif_${Date.now()}`,
          type: 'info',
          title,
          message,
          taskId,
          read: false,
          createdAt: Date.now(),
          expiresAt: Date.now() + delay + 86400000, // 24 hours after delay
        };

        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

        if (nativeNotificationId) {
          notificationIdsRef.set(notification.id, nativeNotificationId);
        }

        saveNotifications();
        return notification.id;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to schedule notification' });
        return null;
      }
    },
    [dispatch, saveNotifications]
  );

  // Cancel notification
  const cancelNotification = useCallback(
    async (notificationId: string) => {
      try {
        const nativeId = notificationIdsRef.get(notificationId);
        if (nativeId) {
          await notificationService.cancelNotification(nativeId);
          notificationIdsRef.delete(notificationId);
        }
        dispatch({ type: 'DELETE_NOTIFICATION', payload: notificationId });
        saveNotifications();
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to cancel notification' });
      }
    },
    [dispatch, saveNotifications]
  );

  // Mark as read
  const markAsRead = useCallback(
    (notificationId: string) => {
      dispatch({ type: 'MARK_AS_READ', payload: notificationId });
      saveNotifications();
    },
    [dispatch, saveNotifications]
  );

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
    saveNotifications();
  }, [dispatch, saveNotifications]);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    // Cancel all scheduled notifications
    state.notifications.forEach((notif) => {
      const nativeId = notificationIdsRef.get(notif.id);
      if (nativeId) {
        notificationService.cancelNotification(nativeId);
      }
    });
    notificationIdsRef.clear();

    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    saveNotifications();
  }, [state.notifications, dispatch, saveNotifications]);

  // Remove expired notifications
  const removeExpiredNotifications = useCallback(() => {
    dispatch({ type: 'REMOVE_EXPIRED' });
    saveNotifications();
  }, [dispatch, saveNotifications]);

  // Schedule notification at specific date
  const scheduleNotificationAtDate = useCallback(
    async (title: string, message: string, date: Date, taskId?: string) => {
      if (!notificationService.isSupported()) return null;

      try {
        const nativeNotificationId = await notificationService.scheduleNotificationAtDate(
          title,
          message,
          date
        );

        if (nativeNotificationId) {
          const notification: Notification = {
            id: `notif_${Date.now()}`,
            type: 'info',
            title,
            message,
            taskId,
            read: false,
            createdAt: Date.now(),
            expiresAt: date.getTime() + 86400000, // 24 hours after trigger
          };

          dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
          notificationIdsRef.set(notification.id, nativeNotificationId);
          saveNotifications();
          return nativeNotificationId;
        }
        return null;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to schedule notification at date' });
        return null;
      }
    },
    [dispatch, saveNotifications]
  );

  // Task-specific notification management
  const scheduleTaskNotification = useCallback(
    async (task: { id: string, title: string, date: string }) => {
      if (!state.preferences.enableTaskReminders || !notificationService.isSupported()) {
        return null;
      }

      const taskDate = new Date(task.date);
      // Remind X minutes before
      const reminderDate = new Date(taskDate.getTime() - state.preferences.notificationTime * 60000);

      // Don't schedule if it's in the past
      if (reminderDate.getTime() <= Date.now()) {
        return null;
      }

      const id = await scheduleNotificationAtDate(
        `Rappel : ${task.title}`,
        `Votre tâche commence dans ${state.preferences.notificationTime} minutes.`,
        reminderDate,
        task.id
      );

      return id;
    },
    [state.preferences.enableTaskReminders, state.preferences.notificationTime, scheduleNotificationAtDate]
  );

  const cancelTaskNotification = useCallback(
    async (nativeId: string) => {
      if (!nativeId || !notificationService.isSupported()) return;
      await notificationService.cancelNotification(nativeId);
    },
    []
  );

  // Request notification permissions
  const requestPermissions = useCallback(async () => {
    try {
      const granted = await notificationService.requestPermissions();
      return granted;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to request permissions' });
      return false;
    }
  }, [dispatch]);

  // Update preferences
  const updatePreferences = useCallback(
    (updates: Partial<typeof state.preferences>) => {
      dispatch({
        type: 'UPDATE_PREFERENCES',
        payload: updates,
      });
    },
    [dispatch]
  );

  // Cleanup interval for removing expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      removeExpiredNotifications();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [removeExpiredNotifications]);

  return {
    // State
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    preferences: state.preferences,
    loading: state.loading,
    error: state.error,

    // Actions
    scheduleNotification,
    scheduleNotificationAtDate,
    scheduleTaskNotification,
    cancelTaskNotification,
    cancelNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    removeExpiredNotifications,
    requestPermissions,
    updatePreferences,
    loadNotifications,
    saveNotifications,
  };
};

