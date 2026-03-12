import { useTaskContext } from '@/context/TaskContext';
import { STORAGE_KEYS, storageService } from '@/services/storage';
import { Task, TaskFilters } from '@/types/task';
import { useCallback } from 'react';
import { useNotifications } from './useNotifications';

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  // Load tasks from storage
  const loadTasksFromStorage = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tasks = await storageService.getItem<Task[]>(STORAGE_KEYS.TASKS) || [];
      const migratedTasks = tasks.map(task => ({
        ...task,
        date: task.date || (task.createdAt ? new Date(task.createdAt).toISOString() : new Date().toISOString())
      }));
      dispatch({ type: 'SET_TASKS', payload: migratedTasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks' });
    }
  }, [dispatch]);

  // Save tasks to storage (internal helper)
  const persistTasks = useCallback(async (tasksToSave: Task[]) => {
    try {
      await storageService.setItem(STORAGE_KEYS.TASKS, tasksToSave);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save tasks' });
    }
  }, [dispatch]);

  const { scheduleTaskNotification, cancelTaskNotification } = useNotifications();

  // Add task
  const addTask = useCallback(
    (taskData: {
      id?: string;
      title: string;
      description?: string;
      categoryId?: string;
      date?: string; // ISO 8601 string
      priority?: 'low' | 'medium' | 'high';
      duration?: number;
      notification?: boolean;
    }) => {
      const dateString = taskData.date || new Date().toISOString();
      let dueDate: number | undefined;
      const dateObj = new Date(dateString);
      if (!isNaN(dateObj.getTime())) {
        dueDate = dateObj.getTime();
      }

      const newTask: Task = {
        id: taskData.id || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: taskData.title,
        description: taskData.description,
        categoryId: taskData.categoryId,
        date: dateString,
        dueDate,
        status: 'pending',
        priority: taskData.priority || 'medium',
        duration: taskData.duration,
        notification: taskData.notification,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Handle Notifications
      const handleAddNotification = async () => {
        if (newTask.notification) {
          const notificationId = await scheduleTaskNotification(newTask);
          if (notificationId) {
            const finalTask = { ...newTask, notificationId };
            const tasksWithNotif = state.tasks.map(t => t.id === newTask.id ? finalTask : t);
            if (!state.tasks.find(t => t.id === newTask.id)) {
              // If it was just added to state by dispatch before
              dispatch({ type: 'UPDATE_TASK', payload: finalTask });
            }
          }
        }
      };

      const newTasks = [...state.tasks, newTask];
      dispatch({ type: 'ADD_TASK', payload: newTask });
      persistTasks(newTasks);
      handleAddNotification();

      return newTask;
    },
    [state.tasks, dispatch, persistTasks]
  );

  // Update task
  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        // Compute new dueDate if date is Updated
        let newDueDate = updates.dueDate;
        if (updates.date && !updates.dueDate) {
          const d = new Date(updates.date);
          if (!isNaN(d.getTime())) {
            newDueDate = d.getTime();
          }
        }

        const updated: Task = {
          ...task,
          ...updates,
          dueDate: newDueDate ?? task.dueDate,
          id: task.id,
          createdAt: task.createdAt,
          updatedAt: Date.now(),
        };

        // Handle Notifications updates
        const handleUpdateNotification = async () => {
          // Cancel existing if it exists
          if (task.notificationId) {
            await cancelTaskNotification(task.notificationId);
          }

          // Schedule new if enabled and not completed
          if (updated.notification && updated.status !== 'completed') {
            const newNotifId = await scheduleTaskNotification(updated);
            if (newNotifId !== updated.notificationId) {
              const finalUpdated = { ...updated, notificationId: newNotifId || undefined };
              dispatch({ type: 'UPDATE_TASK', payload: finalUpdated });
              const currentTasks = state.tasks.map((t) =>
                t.id === id ? finalUpdated : t
              );
              persistTasks(currentTasks);
            }
          } else if (!updated.notification && task.notificationId) {
            const finalUpdated = { ...updated, notificationId: undefined };
            dispatch({ type: 'UPDATE_TASK', payload: finalUpdated });
            const currentTasks = state.tasks.map((t) =>
              t.id === id ? finalUpdated : t
            );
            persistTasks(currentTasks);
          }
        };

        const newTasks = state.tasks.map((t) =>
          t.id === id ? updated : t
        );

        dispatch({ type: 'UPDATE_TASK', payload: updated });
        persistTasks(newTasks);
        handleUpdateNotification();
      }
    },
    [state.tasks, dispatch, persistTasks]
  );

  // Delete task
  const deleteTask = useCallback(
    (id: string) => {
      const task = state.tasks.find(t => t.id === id);
      if (task?.notificationId) {
        cancelTaskNotification(task.notificationId);
      }
      const newTasks = state.tasks.filter((task) => task.id !== id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      persistTasks(newTasks);
    },
    [state.tasks, dispatch, persistTasks]
  );

  // Toggle task status
  const toggleTaskStatus = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        let newStatus = task.status;
        if (task.status === 'pending') {
          newStatus = 'in-progress';
        } else if (task.status === 'in-progress') {
          newStatus = 'completed';
        } else if (task.status === 'completed') {
          newStatus = 'pending';
        }

        const updated: Task = {
          ...task,
          status: newStatus,
          completedAt:
            newStatus === 'completed' ? Date.now() : task.completedAt,
          updatedAt: Date.now(),
          // Cancel notification if completed
          notificationId: newStatus === 'completed' ? undefined : task.notificationId,
        };

        if (newStatus === 'completed' && task.notificationId) {
          cancelTaskNotification(task.notificationId);
        }

        const newTasks = state.tasks.map((t) =>
          t.id === id ? updated : t
        );

        dispatch({ type: 'UPDATE_TASK', payload: updated });
        persistTasks(newTasks);
      }
    },
    [state.tasks, dispatch, persistTasks]
  );

  // Filter tasks
  const filterTasks = useCallback(
    (filters: TaskFilters) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },
    [dispatch]
  );

  // Get tasks by status
  const getTasksByStatus = useCallback(
    (status: Task['status']): Task[] => {
      return state.tasks.filter((task) => task.status === status);
    },
    [state.tasks]
  );

  // Get tasks by category
  const getTasksByCategory = useCallback(
    (categoryId: string): Task[] => {
      return state.tasks.filter((task) => task.categoryId === categoryId);
    },
    [state.tasks]
  );

  // Get task by ID
  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return state.tasks.find((task) => task.id === id);
    },
    [state.tasks]
  );

  // Get filtered tasks
  const getFilteredTasks = useCallback((): Task[] => {
    let filtered = state.tasks;

    if (state.filters.status) {
      filtered = filtered.filter((t) => t.status === state.filters.status);
    }
    if (state.filters.priority) {
      filtered = filtered.filter((t) => t.priority === state.filters.priority);
    }
    if (state.filters.categoryId) {
      filtered = filtered.filter((t) => t.categoryId === state.filters.categoryId);
    }
    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [state.tasks, state.filters]);

  return {
    // State
    tasks: state.tasks,
    filters: state.filters,
    filteredTasks: getFilteredTasks(),
    selectedTaskId: state.selectedTaskId,
    loading: state.loading,
    error: state.error,

    // Actions
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    filterTasks,
    getTasksByStatus,
    getTasksByCategory,
    getTaskById,
    loadTasksFromStorage,
    saveTasksToStorage: persistTasks,
  };
};

