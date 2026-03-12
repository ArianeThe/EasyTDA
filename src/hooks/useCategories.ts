import { useCallback } from 'react';
import { useCategoryContext } from '../context/CategoryContext';
import { STORAGE_KEYS, storageService } from '../services/storage';
import { Category, CategoryStats } from '../types/category';
import { useTasks } from './useTasks';

export const useCategories = () => {
  const { state, dispatch } = useCategoryContext();
  const { tasks } = useTasks();

  // Load categories from storage
  const loadCategories = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let categories = await storageService.getItem<Category[]>(
        STORAGE_KEYS.CATEGORIES
      );

      // If no categories found, create default ones
      if (!categories || categories.length === 0) {
        const defaultCats = [
          { name: 'Work', color: '#00E5FF' }, // Cyan
          { name: 'Personal', color: '#FF4081' }, // Pink
          { name: 'Health', color: '#00E676' }, // Neon Green
          { name: 'Shopping', color: '#FFEA00' }, // Sun Yellow
          { name: 'Urgent', color: '#FF5252' }, // Coral Red
        ];

        categories = defaultCats.map((c, index) => ({
          id: `cat_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
          name: c.name,
          color: c.color,
          taskCount: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }));

        await storageService.setItem(STORAGE_KEYS.CATEGORIES, categories);
      }

      dispatch({ type: 'SET_CATEGORIES', payload: categories || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load categories' });
    }
  }, [dispatch]);

  // Save categories to storage (internal helper)
  const persistCategories = useCallback(async (categoriesToSave: Category[]) => {
    try {
      await storageService.setItem(STORAGE_KEYS.CATEGORIES, categoriesToSave);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save categories' });
    }
  }, [dispatch]);

  // Add category
  const addCategory = useCallback(
    (name: string, color: string, description?: string, icon?: string) => {
      const newCategory: Category = {
        id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        color,
        description,
        icon,
        taskCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const newCategories = [...state.categories, newCategory];
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
      persistCategories(newCategories);

      return newCategory;
    },
    [state.categories, dispatch, persistCategories]
  );

  // Update category
  const updateCategory = useCallback(
    (id: string, updates: Partial<Category>) => {
      const category = state.categories.find((c) => c.id === id);
      if (category) {
        const updated: Category = {
          ...category,
          ...updates,
          id: category.id,
          createdAt: category.createdAt,
          updatedAt: Date.now(),
        };

        const newCategories = state.categories.map((c) =>
          c.id === id ? updated : c
        );

        dispatch({ type: 'UPDATE_CATEGORY', payload: updated });
        persistCategories(newCategories);
      }
    },
    [state.categories, dispatch, persistCategories]
  );

  // Delete category
  const deleteCategory = useCallback(
    (id: string) => {
      const newCategories = state.categories.filter((c) => c.id !== id);
      dispatch({ type: 'DELETE_CATEGORY', payload: id });
      persistCategories(newCategories);
    },
    [state.categories, dispatch, persistCategories]
  );

  // Get category by ID
  const getCategoryById = useCallback(
    (id: string): Category | undefined => {
      return state.categories.find((cat) => cat.id === id);
    },
    [state.categories]
  );

  // Compute category stats
  const computeCategoryStats = useCallback(
    (categoryId: string): CategoryStats => {
      const categoryTasks = tasks.filter((t) => t.categoryId === categoryId);
      return {
        totalTasks: categoryTasks.length,
        completedTasks: categoryTasks.filter((t) => t.status === 'completed')
          .length,
        pendingTasks: categoryTasks.filter((t) => t.status === 'pending').length,
        inProgressTasks: categoryTasks.filter((t) => t.status === 'in-progress')
          .length,
      };
    },
    [tasks]
  );

  // Compute all stats
  const computeAllStats = useCallback(() => {
    const allStats: Record<string, CategoryStats> = {};
    state.categories.forEach((cat) => {
      allStats[cat.id] = computeCategoryStats(cat.id);
    });
    dispatch({ type: 'SET_STATS', payload: allStats });
  }, [state.categories, dispatch, computeCategoryStats]);

  // Update task count for category
  const updateTaskCount = useCallback(
    (categoryId: string) => {
      const category = state.categories.find((c) => c.id === categoryId);
      const taskCount = tasks.filter((t) => t.categoryId === categoryId).length;

      if (category) {
        const stats = computeCategoryStats(categoryId);
        // We use updateCategory logic inline to avoid circular dependency or double dispatch if we called updateCategory
        // But here we need to reuse the logic. updateCategory is defined above.
        // However, updateCategory calls persistCategories.
        // Let's call updateCategory.
        updateCategory(categoryId, { taskCount });
        dispatch({
          type: 'UPDATE_STATS',
          payload: { categoryId, stats },
        });
      }
    },
    [state.categories, tasks, dispatch, computeCategoryStats, updateCategory]
  );

  return {
    // State
    categories: state.categories,
    selectedCategoryId: state.selectedCategoryId,
    stats: state.stats,
    loading: state.loading,
    error: state.error,

    // Actions
    addCategory,
    updateCategory,
    deleteCategory,
    removeCategory: deleteCategory,
    getCategoryById,
    computeCategoryStats,
    computeAllStats,
    updateTaskCount,
    loadCategories,
    saveCategories: persistCategories,
  };
};

