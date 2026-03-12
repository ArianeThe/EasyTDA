import { Category, CategoryStats } from '@/types/category';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Type State
export interface CategoryState {
  categories: Category[];
  selectedCategoryId?: string;
  stats: Record<string, CategoryStats>;
  loading: boolean;
  error?: string;
}

// Type Action
export type CategoryAction =
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | { type: 'DESELECT_CATEGORY' }
  | { type: 'UPDATE_STATS'; payload: { categoryId: string; stats: CategoryStats } }
  | { type: 'SET_STATS'; payload: Record<string, CategoryStats> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'RESET' };

// Initial State
const initialState: CategoryState = {
  categories: [],
  stats: {},
  loading: false,
};

// Reducer
const categoryReducer = (
  state: CategoryState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        stats: {
          ...state.stats,
          [action.payload.id]: {
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
            inProgressTasks: 0,
          },
        },
        error: undefined,
      };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
        error: undefined,
      };

    case 'DELETE_CATEGORY':
      const { [action.payload]: deletedStats, ...remainingStats } =
        state.stats;
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
        selectedCategoryId:
          state.selectedCategoryId === action.payload
            ? undefined
            : state.selectedCategoryId,
        stats: remainingStats,
        error: undefined,
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        error: undefined,
      };

    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategoryId: action.payload,
      };

    case 'DESELECT_CATEGORY':
      return {
        ...state,
        selectedCategoryId: undefined,
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.categoryId]: action.payload.stats,
        },
      };

    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
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
interface CategoryContextType {
  state: CategoryState;
  dispatch: React.Dispatch<CategoryAction>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

// Provider
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook
export const useCategoryContext = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within CategoryProvider');
  }
  return context;
};

