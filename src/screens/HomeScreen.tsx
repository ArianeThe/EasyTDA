import ComicText from '@/components/ui/ComicText';
import { Task } from '@/types/task';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

// Hooks
import { useCategories } from '@/hooks/useCategories';
import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';

// Components
import PowerGauge from '@/components/cadran/PowerGauge';
import TaskList from '@/components/tasks/TaskList';
import { styles } from '@/styles/screens/HomeScreen.styles';
import { formatYYYYMMDD } from '@/utils/dateUtils';

// Icons
const AddIcon = require('@/../assets/icons/add-icon.png');
const CalendarIcon = require('@/../assets/icons/calendar-icon.png');
const FocusIcon = require('@/../assets/icons/focus-icon.png');
const NotifyIcon = require('@/../assets/icons/notify-icon.png');

const PendingIcon = require('@/../assets/icons/status/pending.png');
const InProgressIcon = require('@/../assets/icons/status/in-progress.png');
const CompletedIcon = require('@/../assets/icons/status/completed.png');


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
  }, []);

  // Reload when screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadTasksFromStorage();
      loadNotifications();
      loadCategories();
    }, [])
  );

  const today = formatYYYYMMDD(new Date());

  // Toutes les tâches du jour (même completed)
  const tasksToday = useMemo(() => {
    return (tasks || []).filter((t: Task) => {
      if (!t.date) return false;
      return formatYYYYMMDD(new Date(t.date)) === today;
    });
  }, [tasks, today]);

  // Filtre local
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasksToday = useMemo(() => {
    if (filter === 'all') return tasksToday;
    return tasksToday.filter((t) => t.status === filter);
  }, [tasksToday, filter]);

  // Stats
  const taskStats = {
    total: tasks?.length || 0,
    today: tasksToday?.length || 0,
    completed: tasks?.filter((t: Task) => t.status === 'completed').length || 0,
  };

  // PowerGauge
  const totalTasksToday = tasksToday.length;
  const remainingTasksToday = tasksToday.filter((t) => t.status !== 'completed').length;
  const progress = totalTasksToday > 0 ? remainingTasksToday / totalTasksToday : 0;

  // Navigation handlers
  const handleAddTask = () => router.push('/addTask');
  const handleOpenCalendar = () => router.push('/calendar');
  const handleOpenTimer = () => router.push('/timer');
  const handleOpenNotifications = () => router.push('/notifications');
  const handleFocusTask = (taskId: string) => router.push(`/focus/${taskId}`);
  const handleEditTask = (taskId: string) => router.push(`/edit-task/${taskId}`);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <ComicText style={styles.title}>Easy Organisation</ComicText>
          <ComicText style={styles.subtitle}>Tu peux le faire et tu l'as fait !</ComicText>
        </View>

        {/* ROW 1 — AddTask + Calendar */}
        <View style={styles.widgetsRow}>
          <TouchableOpacity style={styles.widgetWrapper} onPress={handleAddTask}>
            <Image source={AddIcon} style={styles.bigIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.widgetWrapper} onPress={handleOpenCalendar}>
            <Image source={CalendarIcon} style={styles.bigIcon} />
          </TouchableOpacity>
        </View>

        {/* CADRAN */}
        <View style={styles.cadranContainer}>
          <PowerGauge
            progress={progress}
            size={220}
            showExplosion={totalTasksToday > 0 && remainingTasksToday === 0}
          />
        </View>

        {/* ROW 2 — Focus + Notify */}
        <View style={styles.widgetsRow}>
          <TouchableOpacity style={styles.widgetWrapper} onPress={handleOpenTimer}>
            <Image source={FocusIcon} style={styles.bigIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.widgetWrapper} onPress={handleOpenNotifications}>
            <Image source={NotifyIcon} style={styles.bigIcon} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <ComicText style={styles.badgeText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </ComicText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* TASKS TODAY */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <ComicText style={styles.sectionTitle}>Tâches du jour</ComicText>
            <ComicText style={styles.sectionSubtitle}>
              {filteredTasksToday.length} tâche{filteredTasksToday.length !== 1 ? 's' : ''}
            </ComicText>
          </View>

          {/* FILTRE */}
          <View style={styles.filterRow}>
            <TouchableOpacity onPress={() => setFilter('all')}>
              <ComicText style={[styles.filterText, filter === 'all' && styles.filterActive]}>
                Tous
              </ComicText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('pending')}>
              <Image source={PendingIcon} style={styles.filterIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('in-progress')}>
              <Image source={InProgressIcon} style={styles.filterIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('completed')}>
              <Image source={CompletedIcon} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
          </View>

          {/* LISTE DES TÂCHES */}
          {filteredTasksToday.length > 0 ? (
            <TaskList tasks={filteredTasksToday} onFocus={handleFocusTask} onEdit={handleEditTask} />
          ) : (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyStateText}>Aucune tâche aujourd'hui</ComicText>
              <ComicText style={styles.emptyStateSubtext}>Tu gères !</ComicText>
            </View>
          )}
        </View>
    </ScrollView>
  );
}
