import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { styles } from '@/styles/taskList.styles';

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

  // Delete directly via hook

  const renderItem = ({ item }: { item: Task }) => {
    const isCompleted = item.status === 'completed';

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isCompleted && styles.itemCompleted]}
        onPress={() => onEdit && onEdit(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.itemContent}>
          <TouchableOpacity
            onPress={() => toggleTaskStatus(item.id)}
            style={styles.toggleArea}
          >
            <ComicText
              style={[styles.title, isCompleted && styles.titleCompleted]}
              numberOfLines={1}
            >
              {item.title}
            </ComicText>
            {item.description ? (
              <ComicText style={styles.description} numberOfLines={2}>
                {item.description}
              </ComicText>
            ) : null}
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.statusBadge}>
            <ComicText style={styles.statusText}>{item.status}</ComicText>
          </View>

          {onFocus && (
            <TouchableOpacity
              style={styles.focusButton}
              onPress={() => onFocus(item.id)}
            >
              <ComicText style={styles.focusButtonText}>Focus</ComicText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <ComicText style={styles.deleteButtonText}>Supprimer</ComicText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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

 

