import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { useCategories } from '@/hooks/useCategories';
import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';
import { notificationService } from '@/services/notifications';
import { styles } from '@/styles/editTaskScreen.styles';
import { theme } from '@/styles/theme';
import { formatDisplayDate, formatDisplayTime, parseISO8601 } from '@/utils/dateUtils';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask, deleteTask, getTaskById } = useTasks();
  const { categories } = useCategories();
  const { preferences } = useNotifications();

  const isSupported = notificationService.isSupported();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [duration, setDuration] = useState<number>(30);
  const [notification, setNotification] = useState(false);

  // Date and Time State
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Load task data on mount
  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      if (task) {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setSelectedCategory(task.categoryId || null);
        setPriority(task.priority as 'low' | 'medium' | 'high' || 'medium');
        setDuration(task.duration || 30);
        setNotification(task.notification || false);
        if (task.date) {
          setDate(parseISO8601(task.date));
        }
      }
    }
  }, [id, getTaskById]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDate(newDate);
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const durationOptions = [
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1h', value: 60 },
    { label: '2h', value: 120 },
  ];

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre');
      return;
    }

    try {
      if (id) {
        updateTask(id, {
          title: title.trim(),
          description: description.trim() || undefined,
          categoryId: selectedCategory || undefined,
          priority,
          duration,
          date: date.toISOString(),
          notification,
        });
        Alert.alert('Succès', 'Tâche mise à jour avec succès');
        router.back();
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la tâche');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Supprimer la tâche ?',
      `Êtes-vous sûr de vouloir supprimer "${title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: () => {
            if (id) {
              deleteTask(id);
              router.back();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const selectedCategoryName = categories.find((c) => c.id === selectedCategory)?.name;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ComicText style={styles.backButton}>← Retour</ComicText>
        </TouchableOpacity>
        <ComicText style={styles.headerTitle}>Modifier la tâche</ComicText>
      </View>

      {/* Title Input */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Titre de la tâche</ComicText>
        <TextInput
          style={styles.input}
          placeholder="Entrez le titre"
          placeholderTextColor={theme.colors.textDim}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description Input */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Description</ComicText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Détails (optionnel)"
          placeholderTextColor={theme.colors.textDim}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Category Selection */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Catégorie</ComicText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <ComicText style={styles.dropdownText}>
            {selectedCategoryName || 'Choisir une catégorie'}
          </ComicText>
          <ComicText style={styles.dropdownArrow}>{showCategoryDropdown ? '▲' : '▼'}</ComicText>
        </TouchableOpacity>
        {showCategoryDropdown && (
          <View style={styles.dropdownMenu}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setShowCategoryDropdown(false);
                }}
              >
                <View
                  style={[styles.colorDot, { backgroundColor: cat.color }]}
                />
                <ComicText style={styles.dropdownItemText}>{cat.name}</ComicText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Priority Buttons */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Priorité</ComicText>
        <View style={styles.priorityButtons}>
          {(['low', 'medium', 'high'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityButton,
                priority === p && styles.priorityButtonActive,
              ]}
              onPress={() => setPriority(p)}
            >
              <ComicText
                style={[
                  styles.priorityButtonText,
                  priority === p && styles.priorityButtonTextActive,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </ComicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Duration Dropdown */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Durée prévue</ComicText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDurationDropdown(!showDurationDropdown)}
        >
          <ComicText style={styles.dropdownText}>
            {durationOptions.find(d => d.value === duration)?.label || `${duration} min`}
          </ComicText>
          <ComicText style={styles.dropdownArrow}>{showDurationDropdown ? '▲' : '▼'}</ComicText>
        </TouchableOpacity>
        {showDurationDropdown && (
          <View style={styles.dropdownMenu}>
            {durationOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.dropdownItem}
                onPress={() => {
                  setDuration(opt.value);
                  setShowDurationDropdown(false);
                }}
              >
                <ComicText style={styles.dropdownItemText}>{opt.label}</ComicText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Date & Time Picker */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Échéance</ComicText>
        <View style={{ gap: 12 }}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <ComicText style={styles.dateTimeLabel}>Date</ComicText>
            <ComicText style={styles.dateTimeText}>{formatDisplayDate(date.toISOString())}</ComicText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <ComicText style={styles.dateTimeLabel}>Heure</ComicText>
            <ComicText style={styles.dateTimeText}>{formatDisplayTime(date.toISOString())}</ComicText>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}
      </View>

      {/* Notification Toggle */}
      <View style={styles.section}>
        <View style={styles.notificationRow}>
          <View>
            <ComicText style={styles.label}>Activer la notification</ComicText>
            {(!isSupported || !preferences.enableTaskReminders) && (
              <ComicText style={{ color: theme.colors.textDim, fontSize: 11, maxWidth: 200 }}>
                {!isSupported
                  ? "Non supporté sur Web"
                  : "Désactivé dans les paramètres globaux"}
              </ComicText>
            )}
            {isSupported && preferences.enableTaskReminders && date.getTime() <= Date.now() && (
              <ComicText style={{ color: theme.colors.error, fontSize: 11, maxWidth: 200 }}>
                La date est passée. Aucune notification ne sera programmée.
              </ComicText>
            )}
          </View>
          <Switch
            value={notification && isSupported && preferences.enableTaskReminders && date.getTime() > Date.now()}
            onValueChange={setNotification}
            disabled={!isSupported || !preferences.enableTaskReminders || date.getTime() <= Date.now()}
            trackColor={{ false: theme.colors.surfaceLight, true: theme.colors.primary }}
            thumbColor={theme.colors.white}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ComicText style={styles.saveButtonText}>Enregistrer les modifications</ComicText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <ComicText style={styles.deleteButtonText}>Supprimer la tâche</ComicText>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}



