import { calendarService } from '@/services/calendar';
import { Task } from '@/types/task';
import { useCallback } from 'react';
import { useTasks } from './useTasks';

export const useCalendar = () => {
  const { tasks, updateTask } = useTasks();

  // Get tasks for a specific date
  const getTasksForDate = useCallback(
    (date: Date): Task[] => {
      const dateStr = calendarService.formatDate(date);

      return tasks.filter((task) => {
        if (!task.date) return false;
        const taskDateStr = calendarService.formatDate(new Date(task.date));
        return taskDateStr === dateStr;
      });
    },
    [tasks]
  );

  // Get tasks for a week
  const getTasksForWeek = useCallback(
    (date: Date = new Date()): Record<string, Task[]> => {
      const weekDates = calendarService.getWeekDates(date);
      const weekTasks: Record<string, Task[]> = {};

      weekDates.forEach((d) => {
        const dateStr = calendarService.formatDate(d);
        weekTasks[dateStr] = getTasksForDate(d);
      });

      return weekTasks;
    },
    [getTasksForDate]
  );

  // Move task to different date
  const moveTask = useCallback(
    (taskId: string, newDate: Date) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        // Keep the original time if it exists
        const oldDate = task.date ? new Date(task.date) : new Date();
        const updatedDate = new Date(newDate);
        updatedDate.setHours(oldDate.getHours());
        updatedDate.setMinutes(oldDate.getMinutes());
        updatedDate.setSeconds(oldDate.getSeconds());

        updateTask(taskId, {
          date: updatedDate.toISOString(),
          dueDate: updatedDate.getTime()
        });
      }
    },
    [tasks, updateTask]
  );

  // Get week dates starting from a date
  const getWeekDates = useCallback((date: Date = new Date()): Date[] => {
    return calendarService.getWeekDates(date);
  }, []);

  // Get start of week
  const getStartOfWeek = useCallback((date: Date = new Date()): Date => {
    return calendarService.getStartOfWeek(date);
  }, []);

  // Get end of week
  const getEndOfWeek = useCallback((date: Date = new Date()): Date => {
    return calendarService.getEndOfWeek(date);
  }, []);

  // Check if date is today
  const isToday = useCallback((date: Date): boolean => {
    return calendarService.isSameDay(date, new Date());
  }, []);

  // Get formatted date string
  const formatDate = useCallback((date: Date): string => {
    return calendarService.formatDate(date);
  }, []);

  // Get tasks overdue
  const getOverdueTasks = useCallback((): Task[] => {
    const now = Date.now();
    return tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate < now &&
        task.status !== 'completed' &&
        task.status !== 'cancelled'
    );
  }, [tasks]);

  // Get tasks due today
  const getTasksDueToday = useCallback((): Task[] => {
    return getTasksForDate(new Date());
  }, [getTasksForDate]);

  // Get tasks due this week
  const getTasksDueThisWeek = useCallback((): Task[] => {
    const weekTasks = getTasksForWeek();
    return Object.values(weekTasks).flat();
  }, [getTasksForWeek]);

  return {
    // Actions
    getTasksForDate,
    getTasksForWeek,
    moveTask,
    getWeekDates,
    getStartOfWeek,
    getEndOfWeek,
    isToday,
    formatDate,
    getOverdueTasks,
    getTasksDueToday,
    getTasksDueThisWeek,
  };
};

