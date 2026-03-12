import { Task } from '@/types/task';
import { formatYYYYMMDD } from '@/utils/dateUtils';
import { useCallback, useMemo } from 'react';
import { useTasks } from './useTasks';

export interface CadranSegment {
  id: string;
  startAngle: number;
  endAngle: number;
  label: string;
  color: string;
  value: number;
  percentage: number;
  tasks: Task[];
}

export interface CadranConfig {
  radius: number;
  innerRadius: number;
  segments: CadranSegment[];
  totalValue: number;
  completionPercentage: number;
}

export const useCadran = (tasksOverride?: Task[]) => {
  const { tasks: contextTasks } = useTasks();

  const tasks = useMemo(() => {
    if (tasksOverride) return tasksOverride;

    // Default: only tasks for today
    const today = formatYYYYMMDD(new Date());
    return contextTasks.filter(t => {
      if (!t.date) return false;
      const taskDate = formatYYYYMMDD(new Date(t.date));
      return taskDate === today;
    });
  }, [tasksOverride, contextTasks]);

  // Compute segments based on task categories
  const computeSegments = useCallback((): CadranSegment[] => {
    // Group tasks by status
    const statusGroups = {
      pending: tasks.filter((t) => t.status === 'pending'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      completed: tasks.filter((t) => t.status === 'completed'),
    };

    const segments: CadranSegment[] = [];
    let currentAngle = 0;

    Object.entries(statusGroups).forEach(([status, statusTasks], index) => {
      const value = statusTasks.length;
      const percentage = tasks.length > 0 ? (value / tasks.length) * 100 : 0;
      const segmentAngle = (percentage / 100) * 360;

      const colors = ['#5C6B89', '#F2C76E', '#D4A857'];
      const labels = ['Pending', 'In Progress', 'Completed'];

      segments.push({
        id: `segment_${status}`,
        startAngle: currentAngle,
        endAngle: currentAngle + segmentAngle,
        label: labels[index],
        color: colors[index],
        value,
        percentage,
        tasks: statusTasks,
      });

      currentAngle += segmentAngle;
    });

    return segments;
  }, [tasks]);

  // Compute angles for segments
  const computeAngles = useCallback((segments: CadranSegment[]) => {
    return segments.map((segment) => ({
      ...segment,
      startAngle: segment.startAngle,
      endAngle: segment.endAngle,
      centerAngle: (segment.startAngle + segment.endAngle) / 2,
    }));
  }, []);

  // Compute colors based on completion
  const computeColors = useCallback(
    (segments: CadranSegment[]): Record<string, string> => {
      const colors: Record<string, string> = {};

      segments.forEach((segment) => {
        colors[segment.id] = segment.color;
      });

      return colors;
    },
    []
  );

  // Compute remaining percentage (inverted logic)
  const computeRemainingPercentage = useCallback((): number => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const remaining = tasks.length - completed;
    return (remaining / tasks.length) * 100;
  }, [tasks]);

  // Get cadran configuration
  const getCadranConfig = useCallback((): CadranConfig => {
    const segments = computeSegments();
    const completionPercentage = computeRemainingPercentage();

    return {
      radius: 150,
      innerRadius: 100,
      segments,
      totalValue: tasks.length,
      completionPercentage,
    };
  }, [computeSegments, computeRemainingPercentage, tasks.length]);

  // Get segment by angle
  const getSegmentByAngle = useCallback(
    (angle: number): CadranSegment | undefined => {
      const segments = computeSegments();
      return segments.find(
        (seg) => angle >= seg.startAngle && angle <= seg.endAngle
      );
    },
    [computeSegments]
  );

  // Get segment by status
  const getSegmentByStatus = useCallback(
    (status: Task['status']): CadranSegment | undefined => {
      const segments = computeSegments();
      return segments.find((seg) =>
        seg.tasks.some((t) => t.status === status)
      );
    },
    [computeSegments]
  );

  // Get metrics for cadran
  const getCadranMetrics = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      completionPercentage: computeRemainingPercentage(),
    };
  }, [tasks, computeRemainingPercentage]);

  return {
    // Configuration
    config: getCadranConfig(),
    metrics: getCadranMetrics,

    // Actions
    computeSegments,
    computeAngles,
    computeColors,
    computeCompletionPercentage: computeRemainingPercentage,
    getCadranConfig,
    getSegmentByAngle,
    getSegmentByStatus,
  };
};

