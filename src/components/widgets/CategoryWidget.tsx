import React from 'react';
import { View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { useCategories } from '@/hooks/useCategories';
import { styles } from '@/styles/categoryWidget.styles';

interface CategoryWidgetProps {
  onPress?: () => void;
}

export default function CategoryWidget({ onPress }: CategoryWidgetProps) {
  const { categories, stats } = useCategories();

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.container}>
        <ComicText style={styles.title}>Catégories</ComicText>
        <ComicText style={styles.subtitle}>Crée des catégories pour grouper tes taches</ComicText>
      </View>
    );
  }

  const displayed = categories.slice(0, 3);

  return (
    <View style={styles.container}>
      <ComicText style={styles.title}>Catégories</ComicText>
      <View style={styles.chipsRow}>
        {displayed.map((cat) => {
          const stat = stats[cat.id];
          const total = stat?.totalTasks ?? cat.taskCount ?? 0;
          return (
            <View key={cat.id} style={styles.chip}>
              <View style={[styles.colorDot, { backgroundColor: cat.color }]} />
              <View style={styles.chipTextContainer}>
                <ComicText style={styles.chipLabel} numberOfLines={1}>
                  {cat.name}
                </ComicText>
                <ComicText style={styles.chipSubLabel}>{total} taches</ComicText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

