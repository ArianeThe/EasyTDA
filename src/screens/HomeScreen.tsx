import { Task } from '@/types/task';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


// Hooks
import { useCadran } from '@/hooks/useCadran';
import { useCategories } from '@/hooks/useCategories';
import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';

// Components (IMPORT DEFAULT — CORRECT)
import PowerGauge from '@/components/cadran/PowerGauge';
import TaskList from '@/components/tasks/TaskList';
import { styles } from '@/styles/screens/HomeScreen.styles';
import { formatYYYYMMDD } from '@/utils/dateUtils';

const AddIcon = require('@/../assets/icons/add-icon.png');
const CalendarIcon = require('@/../assets/icons/calendar-icon.png');
const FocusIcon = require('@/../assets/icons/focus-icon.png');
const NotifyIcon = require('@/../assets/icons/notify-icon.png');

export default function HomeScreen() {
  const router = useRouter();

  // Hooks
  const { tasks, loadTasksFromStorage } = useTasks();
  const { unreadCount, loadNotifications } = useNotifications();
  const { loadCategories } = useCategories();

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      await loadTasksFromStorage();
      await loadNotifications();
      await loadCategories();
    };
    loadData();
  }, [loadTasksFromStorage, loadNotifications, loadCategories]);

  // Reload tasks when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTasksFromStorage();
      loadNotifications();
      loadCategories();
    }, [loadTasksFromStorage, loadNotifications, loadCategories])
  );

  const today = formatYYYYMMDD(new Date());

  // Filter tasks by today's date (exclude completed for today section)
  const tasksToday = useMemo(() => {
    return (tasks || []).filter((t: Task) => {
      if (!t.date) return false;
      return formatYYYYMMDD(new Date(t.date)) === today && t.status !== 'completed';
    });
  }, [tasks, today]);

  const allTasksToday = useMemo(() => {
    return (tasks || []).filter((t: Task) => {
      if (!t.date) return false;
      return formatYYYYMMDD(new Date(t.date)) === today;
    });
  }, [tasks, today]);

  // Calculate progress for the power gauge: progress is based on remaining tasks
  const totalTasksToday = allTasksToday.length;
  const remainingTasksToday = tasksToday.length;
  const progress = totalTasksToday > 0 ? remainingTasksToday / totalTasksToday : 0;

  // All active tasks for "All Tasks" section (not just today)
  const activeTasks = useMemo(() => {
    return (tasks || []).filter((t: Task) => t.status !== 'completed');
  }, [tasks]);

  // Cadran configuration - no longer fully needed if we use simple progress, but kept for compatibility if needed elsewhere
  const { config: cadranConfig } = useCadran();

  // Task statistics (safe)
  const taskStats = {
    total: tasks?.length || 0,
    today: tasksToday?.length || 0,
    completed: tasks?.filter((t: Task) => t.status === 'completed').length || 0,
    inProgress: tasks?.filter((t: Task) => t.status === 'in-progress').length || 0,
    pending: tasks?.filter((t: Task) => t.status === 'pending').length || 0,
  };

  const handleAddTask = () => router.push('/addTask');
  const handleOpenCalendar = () => router.push('/calendar');
  const handleOpenTimer = () => router.push('/timer');
  const handleOpenNotifications = () => router.push('/notifications');
  const handleOpenCategories = () => router.push('/categories');
  const handleFocusTask = (taskId: string) => router.push(`/focus/${taskId}`);
  const handleEditTask = (taskId: string) => router.push(`/edit-task/${taskId}`);



  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <ComicText style={styles.title}>EasyTda</ComicText>
          <ComicText style={styles.subtitle}>Tu peux le faire, et tu vas le faire</ComicText>
        </View>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <ComicText style={styles.statLabel}>Total</ComicText>
            <ComicText style={styles.statValue}>{taskStats.total}</ComicText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ComicText style={styles.statLabel}>Aujourd'hui</ComicText>
            <ComicText style={styles.statValue}>{taskStats.today}</ComicText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ComicText style={styles.statLabel}>Fait</ComicText>
            <ComicText style={styles.statValue}>{taskStats.completed}</ComicText>
          </View>
        </View>

        {/* Progress Section Title */}
        <View style={styles.sectionHeader}>
          <ComicText style={styles.sectionTitle}>Progression du jour</ComicText>
        </View>

        {/* Power Gauge (Marvel Comic style) */}
        <View style={styles.cadranContainer}>
          <PowerGauge
            progress={progress}
            size={220}
            showExplosion={totalTasksToday > 0 && remainingTasksToday === 0}
          />
        </View>

        {/* Widgets Row 1 */}
        <View style={styles.widgetsRow}>
          <TouchableOpacity
            style={[styles.widgetWrapper, styles.iconButton]}
            onPress={handleAddTask}
            activeOpacity={0.7}
          >
            <Image source={AddIcon} style={styles.bigIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.widgetWrapper, styles.iconButton]}
            onPress={handleOpenCalendar}
            activeOpacity={0.7}
          >
            <Image source={CalendarIcon} style={styles.bigIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Widgets Row 2 */}
        <View style={styles.widgetsRow}>
          <TouchableOpacity
            style={[styles.widgetWrapper, styles.iconButton]}
            onPress={handleOpenTimer}
            activeOpacity={0.7}
          >
            <Image source={FocusIcon} style={styles.bigIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.widgetWrapper, styles.iconButton]}
            onPress={handleOpenNotifications}
            activeOpacity={0.7}
          >
            <Image source={NotifyIcon} style={styles.bigIcon} resizeMode="contain" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <ComicText style={styles.badgeText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </ComicText>
              </View>
            )}
          </TouchableOpacity>
        </View>


        {/* Tasks Today Section */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <ComicText style={styles.sectionTitle}>Taches du jour</ComicText>
            <ComicText style={styles.sectionSubtitle}>
              {tasksToday.length} taches{tasksToday.length !== 1 ? 's' : ''}
            </ComicText>
          </View>

          {tasksToday.length > 0 ? (
            <TaskList tasks={tasksToday} onFocus={handleFocusTask} onEdit={handleEditTask} />
          ) : (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyStateText}>Pas de tache aujourd'hui</ComicText>
              <ComicText style={styles.emptyStateSubtext}>Bien joué !</ComicText>
            </View>
          )}
        </View>

        {/* All Tasks Section */}
        {activeTasks.length > tasksToday.length && (
          <View style={styles.tasksSection}>
            <View style={styles.sectionHeader}>
              <ComicText style={styles.sectionTitle}>Toutes les taches</ComicText>
              <ComicText style={styles.sectionSubtitle}>
                {activeTasks.length} tache{activeTasks.length !== 1 ? 's' : ''}
              </ComicText>
            </View>
            <TaskList tasks={activeTasks} onFocus={handleFocusTask} onEdit={handleEditTask} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

