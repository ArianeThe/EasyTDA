import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const CalendarIcon = require('@/../assets/icons/calendar-icon.png');

import TaskList from '@/components/tasks/TaskList';
import { useCalendar } from '@/hooks/useCalendar';
import { styles } from '@/styles/screens/CalendarScreen.styles';
import { Task } from '@/types/task';

export default function CalendarScreen() {
  const router = useRouter();
  const {
    getTasksForDate,
    getWeekDates,
    formatDate,
    isToday,
  } = useCalendar();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const tasksForSelectedDate = useMemo<Task[]>(() =>
    getTasksForDate(selectedDate),
    [getTasksForDate, selectedDate]
  );
  const weekDates = useMemo(() => getWeekDates(new Date()), [getWeekDates]);

  const selectedDateStr = formatDate(selectedDate);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
            <ComicText style={styles.backButtonText}>← Back</ComicText>
          </TouchableOpacity>
          <View style={[styles.headerContent, { alignItems: 'center' }]}>
            <Image source={CalendarIcon} style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 12 }} />
            <ComicText style={styles.title}>Calendrier</ComicText>
            <ComicText style={styles.subtitle}>Voir tes tâches sur la semaine</ComicText>
          </View>
        </View>

        {/* Week strip (mini calendar) */}
        <View style={styles.weekStrip}>
          {weekDates.map((date: Date) => {
            const dateStr = formatDate(date);
            const isTodayFlag = isToday(date);
            const isSelected = formatDate(date) === selectedDateStr;
            return (
              <TouchableOpacity
                key={dateStr}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dayItem,
                  isTodayFlag && styles.dayItemToday,
                  isSelected && !isTodayFlag && styles.dayItemSelected,
                ]}
              >
                <ComicText
                  style={[
                    styles.dayLabel,
                    (isTodayFlag || isSelected) && styles.dayLabelToday,
                  ]}
                >
                  {date.toLocaleDateString(undefined, { weekday: 'short' })}
                </ComicText>
                <ComicText
                  style={[
                    styles.dayNumber,
                    (isTodayFlag || isSelected) && styles.dayNumberToday,
                  ]}
                >
                  {date.getDate()}
                </ComicText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected date tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ComicText style={styles.sectionTitle}>
              {isToday(selectedDate) ? "Aujourd'hui" : formatDate(selectedDate)}
            </ComicText>
            <ComicText style={styles.sectionSubtitle}>
              {tasksForSelectedDate.length} tâche{tasksForSelectedDate.length !== 1 ? 's' : ''}
            </ComicText>
          </View>

          {tasksForSelectedDate.length > 0 ? (
            <TaskList tasks={tasksForSelectedDate} />
          ) : (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyTitle}>Pas de tâches pour ce jour</ComicText>
              <ComicText style={styles.emptySubtitle}>
                Planifie ta journée depuis l'écran d'accueil.
              </ComicText>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

