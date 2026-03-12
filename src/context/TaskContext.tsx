import { Task, TaskFilters } from '@/types/task';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Type State
export interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  selectedTaskId?: string;
  loading: boolean;
  error?: string;
}

// Type Action
export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_FILTERS'; payload: TaskFilters }
  | { type: 'SELECT_TASK'; payload: string }
  | { type: 'DESELECT_TASK' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'RESET' };

// Initial State
const initialState: TaskState = {
  tasks: [],
  filters: {},
  loading: false,
};

// Reducer
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: undefined,
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        error: undefined,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        selectedTaskId:
          state.selectedTaskId === action.payload
            ? undefined
            : state.selectedTaskId,
        error: undefined,
      };

    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        error: undefined,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };

    case 'SELECT_TASK':
      return {
        ...state,
        selectedTaskId: action.payload,
      };

    case 'DESELECT_TASK':
      return {
        ...state,
        selectedTaskId: undefined,
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
interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

