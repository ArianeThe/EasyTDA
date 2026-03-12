export interface TimerSession {
  id: string;
  taskId?: string;
  type: 'pomodoro' | 'custom' | 'break';
  duration: number; // in minutes
  elapsed: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  completedPomodoros: number;
  startedAt: number; // timestamp
  pausedAt?: number; // timestamp
  completedAt?: number; // timestamp
}

export interface PomodoroSettings {
  workDuration: number; // in minutes, default 25
  breakDuration: number; // in minutes, default 5
  sessionsBeforeLongBreak: number; // default 4
  longBreakDuration: number; // in minutes, default 15
}

