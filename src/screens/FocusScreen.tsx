import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { CircularCadran } from '@/components/cadran/CircularCadran';
import { useTasks } from '@/hooks/useTasks';
import { styles } from '@/styles/focusScreen.styles';
import { Task } from '@/types/task';

export default function FocusScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks, toggleTaskStatus, getTaskById } = useTasks();

  const focusTask = useMemo(() => {
    if (!tasks || tasks.length === 0) return undefined;
    if (id) {
      const byId = getTaskById(id);
      if (byId) return byId;
    }
    const inProgress = tasks.find((t: Task) => t.status === 'in-progress');
    if (inProgress) return inProgress;
    const pending = tasks.find((t: Task) => t.status === 'pending');
    return pending ?? tasks[0];
  }, [tasks, id, getTaskById]);

  const handleMarkDone = () => {
    if (!focusTask) return;
    if (focusTask.status !== 'completed') {
      toggleTaskStatus(focusTask.id);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ComicText style={styles.backButtonText}>Back</ComicText>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <ComicText style={styles.title}>Focus mode</ComicText>
            <ComicText style={styles.subtitle}>
              Avance sur une seule tâche à la fois, en suivant ta progression en toute clarté.
            </ComicText>
          </View>
        </View>

        {/* Cadran */}
        <View style={styles.cadranCard}>
          <CircularCadran size={260} />
        </View>

        {/* Focus task */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ComicText style={styles.sectionTitle}>Tache en cours</ComicText>
          </View>

          {focusTask ? (
            <View style={styles.focusCard}>
              <ComicText style={styles.focusTitle}>{focusTask.title}</ComicText>
              {focusTask.description ? (
                <ComicText style={styles.focusDescription}>
                  {focusTask.description}
                </ComicText>
              ) : null}
              {focusTask.date ? (
                <ComicText style={styles.focusMeta}>
                  Date: {focusTask.date}
                </ComicText>
              ) : null}
              <ComicText style={styles.focusMeta}>
                Status: {focusTask.status}
              </ComicText>

              <TouchableOpacity
                style={[
                  styles.doneButton,
                  focusTask.status === 'completed' && styles.doneButtonCompleted,
                ]}
                onPress={handleMarkDone}
              >
                <ComicText
                  style={[
                    styles.doneButtonText,
                    focusTask.status === 'completed' &&
                    styles.doneButtonTextCompleted,
                  ]}
                >
                  {focusTask.status === 'completed'
                    ? 'Already done'
                    : 'Mark as done'}
                </ComicText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyTitle}>Aucune tâche à suivre</ComicText>
              <ComicText style={styles.emptySubtitle}>
                La tâche sélectionnée n'a pas pu être trouvée. Retournez en arrière et choisissez-en une autre.
              </ComicText>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}



