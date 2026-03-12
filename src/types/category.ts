export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string; // hex color
  icon?: string;
  taskCount: number;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface CategoryStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
}

