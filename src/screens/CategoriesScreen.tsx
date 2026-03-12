import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { styles } from '@/styles/categoriesScreen.styles';
import { useCategories } from '../hooks/useCategories';

export default function CategoriesScreen() {
  const router = useRouter();
  const {
    categories,
    stats,
    loadCategories,
    addCategory,
    deleteCategory,
  } = useCategories();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#00E5FF'); // Cyan default

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const isEmpty = !categories || categories.length === 0;

  const colors = [
    '#00E5FF', // Cyan
    '#FF4081', // Pink
    '#AA00FF', // Purple
    '#00E676', // Neon Green
    '#FF6D00', // Orange
    '#FFEA00', // Yellow
    '#2979FF', // Royal Blue
    '#FF5252', // Coral
  ];

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Please enter a category name');
      return;
    }

    await addCategory(
      newCategoryName.trim(),
      selectedColor,
      newCategoryDescription.trim() || undefined
    );
    setNewCategoryName('');
    setNewCategoryDescription('');
    setSelectedColor('#00E5FF');
    setShowAddForm(false);
  };

  const handleDeleteCategory = (id: string) => {
    Alert.alert(
      'Delete category?',
      'This will not delete tasks in this category, only the category itself.',
      [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'Delete',
          onPress: () => {
            deleteCategory(id);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back button */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ComicText style={styles.backButtonText}>← Back</ComicText>
        </TouchableOpacity>
        <ComicText style={styles.headerTitle}>Catégories</ComicText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Subtitle */}
          <ComicText style={styles.subtitle}>
            Organise tes taches en créant des catégories. Tu peux ajouter une couleur et une description à chaque catégorie pour mieux les différencier.
          </ComicText>

          {/* Add category button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <ComicText style={styles.addButtonText}>
              {showAddForm ? 'Cancel' : '+ Add category'}
            </ComicText>
          </TouchableOpacity>

          {/* Add Category Form */}
          {showAddForm && (
            <View style={styles.addForm}>
              <ComicText style={styles.formLabel}>Nom de la catégorie *</ComicText>
              <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                autoFocus
              />

              <ComicText style={styles.formLabel}>Description</ComicText>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add a description"
                value={newCategoryDescription}
                onChangeText={setNewCategoryDescription}
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />

              <ComicText style={styles.formLabel}>Couleur</ComicText>
              <View style={styles.colorRow}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorChip,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorChipSelected,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <ComicText style={styles.colorCheckmark}>✓</ComicText>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddCategory}
              >
                <ComicText style={styles.saveButtonText}>Enregistrer la catégorie</ComicText>
              </TouchableOpacity>
            </View>
          )}

          {/* Content */}
          {isEmpty ? (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyTitle}>Pas encore de catégories</ComicText>
              <ComicText style={styles.emptySubtitle}>
                Crée ta première catégorie pour grouper tes taches.
              </ComicText>
            </View>
          ) : (
            <View style={styles.list}>
              {categories.map((cat) => {
                const stat = stats[cat.id];
                const total = stat?.totalTasks ?? cat.taskCount ?? 0;
                const completed = stat?.completedTasks ?? 0;

                return (
                  <View key={cat.id} style={styles.item}>
                    <View style={styles.itemContent}>
                      <View style={styles.itemHeader}>
                        <View
                          style={[
                            styles.colorDot,
                            { backgroundColor: cat.color },
                          ]}
                        />
                        <View style={styles.itemTextContainer}>
                          <ComicText style={styles.itemTitle}>{cat.name}</ComicText>
                          {cat.description ? (
                            <ComicText style={styles.itemDescription} numberOfLines={2}>
                              {cat.description}
                            </ComicText>
                          ) : null}
                        </View>
                      </View>

                      <ComicText style={styles.itemStats}>
                        {total} tâche{total !== 1 ? 's' : ''} · {completed} terminée{completed !== 1 ? 's' : ''}
                      </ComicText>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteCategory(cat.id)}
                      style={styles.deleteButton}
                    >
                      <ComicText style={styles.deleteButtonText}>Supprimer</ComicText>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


