export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  date: string; // ISO 8601 string
  dueDate?: number; // timestamp
  estimatedDuration?: number; // in minutes
  duration?: number; // in minutes
  actualDuration?: number; // in minutes
  notification?: boolean;
  notificationId?: string;
  energy?: 'low' | 'medium' | 'high';
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  completedAt?: number; // timestamp
}

export interface TaskFilters {
  status?: Task['status'];
  priority?: Task['priority'];
  categoryId?: string;
  searchQuery?: string;
}

