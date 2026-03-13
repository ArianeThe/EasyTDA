import ComicText from '@/components/ui/ComicText';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Switch, TextInput, TouchableOpacity, View } from 'react-native';


const AddIcon = require('@/../assets/icons/add-icon.png');

import { useCategories } from '@/hooks/useCategories';
import { useNotifications } from '@/hooks/useNotifications';
import { useTasks } from '@/hooks/useTasks';
import { notificationService } from '@/services/notifications';
import { styles } from '@/styles/addTaskScreen.styles';
import { theme } from '@/styles/theme';
import { formatDisplayDate, formatDisplayTime } from '@/utils/dateUtils';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
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

  // Dropdown visibility
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Energy State
  const [energy, setEnergy] = useState<'low' | 'medium' | 'high'>('medium');

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image source={AddIcon} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
        <ComicText style={styles.headerTitle}>Nouvelle Tâche</ComicText>
      </View>

      {/* Title Section */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Titre</ComicText>
        <TextInput
          style={styles.input}
          placeholder="Entrez le titre de la tâche"
          placeholderTextColor={theme.colors.textDim}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Description</ComicText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Détails de la tâche (optionnel)"
          placeholderTextColor={theme.colors.textDim}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Date & Time Section */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Echéance</ComicText>
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

      {/* Category Selection */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Catégorie</ComicText>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <ComicText style={styles.dropdownValue}>
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : 'Choisir une catégorie'}
          </ComicText>
          <ComicText style={styles.dropdownArrow}>{showCategoryDropdown ? '▲' : '▼'}</ComicText>
        </TouchableOpacity>

        {showCategoryDropdown && (
          <View style={styles.dropdownList}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setShowCategoryDropdown(false);
                }}
              >
                <View style={[styles.colorDot, { backgroundColor: cat.color }]} />
                <ComicText style={styles.dropdownItemText}>{cat.name}</ComicText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Priority Selection */}
      <View style={styles.section}>
        <ComicText style={styles.label}>Priorité</ComicText>
        <View style={styles.priorityRow}>
          {(['low', 'medium', 'high'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityChip,
                priority === p && styles.priorityChipSelected,
              ]}
              onPress={() => setPriority(p)}
            >
              <ComicText style={[
                styles.priorityText,
                priority === p && styles.priorityTextSelected
              ]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </ComicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Energy Selection */}
        <View style={styles.section}>
          <ComicText style={styles.label}>Énergie ressentie</ComicText>
          <View style={styles.priorityRow}>
            {([
              { key: 'low', icon: '💤', label: 'Léger' },
              { key: 'medium', icon: '🔋', label: 'Normal' },
              { key: 'high', icon: '⚡️', label: 'Lourd' },
              ] as const).map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.priorityChip,
                  energy === item.key && styles.priorityChipSelected,
                ]}
                onPress={() => setEnergy(item.key)}
              >
                <ComicText
                  style={[
                    styles.priorityText,
                    energy === item.key && styles.priorityTextSelected,
                  ]}
              >
                {item.icon} {item.label}
                </ComicText>
              </TouchableOpacity>
            ))}
          </View>
        </View>


      {/* Notifications */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <View>
            <ComicText style={styles.label}>Activer les notifications</ComicText>
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

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.back()}
        >
          <ComicText style={styles.buttonTextSecondary}>Annuler</ComicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => {
            if (title.trim()) {
              addTask({
                title: title.trim(),
                description: description.trim(),
                categoryId: selectedCategory ?? undefined,
                priority,
                duration,
                date: date.toISOString(),
                notification,
                energy,
              });
              router.back();
            }
          }}
        >
          <ComicText style={styles.buttonTextPrimary}>Créer la tâche</ComicText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

