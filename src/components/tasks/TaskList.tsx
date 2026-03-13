import ComicText from '@/components/ui/ComicText';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import { useTasks } from '@/hooks/useTasks';
import { styles } from '@/styles/taskList.styles';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onFocus?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
}

export default function TaskList({ tasks, onFocus, onEdit }: TaskListProps) {
  const { toggleTaskStatus, deleteTask } = useTasks();

  if (!tasks || tasks.length === 0) {
    return null;
  }

  const StatusIcons = {
    pending: require('@/../assets/icons/status/pending.png'),
    'in-progress': require('@/../assets/icons/status/in-progress.png'),
    completed: require('@/../assets/icons/status/completed.png'),
  };

  const renderItem = ({ item }: { item: Task }) => {
    const isCompleted = item.status === 'completed';

    return (
      <View style={[styles.itemContainer, isCompleted && styles.itemCompleted]}>

        {/* ZONE GAUCHE : titre + énergie + description */}
        <TouchableOpacity
          style={styles.leftZone}
          onPress={() => onEdit && onEdit(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.titleRow}>
            <ComicText
              style={[styles.title, isCompleted && styles.titleCompleted]}
              numberOfLines={1}
            >
              {item.title}
            </ComicText>

            {item.energy === 'low' && (
              <ComicText style={styles.energyIcon}>💤</ComicText>
            )}
            {item.energy === 'medium' && (
              <ComicText style={styles.energyIcon}>🔋</ComicText>
            )}
            {item.energy === 'high' && (
              <ComicText style={styles.energyIcon}>⚡️</ComicText>
            )}
          </View>

          {item.description ? (
            <ComicText style={styles.description} numberOfLines={2}>
              {item.description}
            </ComicText>
          ) : null}
        </TouchableOpacity>

        {/* ZONE DROITE : statut + supprimer */}
        <View style={styles.rightZone}>

          {/* Bouton statut avec icône comics */}
          <TouchableOpacity
            style={styles.statusButton}
            onPress={() => {
            if (item.status === 'completed') return; //  on bloque le clic
            toggleTaskStatus(item.id);
            }}
            activeOpacity={item.status === 'completed' ? 1 : 0.7} // optionnel, pour enlever l’effet de clic
          >
            <Image
             source={StatusIcons[item.status]}
             style={styles.statusIcon}
            />
          </TouchableOpacity>


         {/* Bouton supprimer */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <ComicText style={styles.deleteButtonText}>Supprimer</ComicText>
          </TouchableOpacity>

        </View>

      </View>
    );
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEnabled={false}
    />
  );
}
