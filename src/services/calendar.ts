export const calendarService = {
  // Get start of week (Monday)
  getStartOfWeek(date: Date = new Date()): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  },

  // Get end of week (Sunday)
  getEndOfWeek(date: Date = new Date()): Date {
    const start = this.getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return end;
  },

  // Get all dates for a week
  getWeekDates(date: Date = new Date()): Date[] {
    const start = this.getStartOfWeek(date);
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  },

  // Check if two dates are the same day
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },

  // Get start of day (00:00:00)
  getStartOfDay(date: Date = new Date()): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  },

  // Get end of day (23:59:59)
  getEndOfDay(date: Date = new Date()): number {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  },

  // Format date to YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
};

