import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const AddIcon = require('@/../assets/icons/add-icon.png');

interface AddTaskWidgetProps {
  onPress: () => void;
}

export default function AddTaskWidget({ onPress }: AddTaskWidgetProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Image source={AddIcon} style={styles.iconImage} />
      </View>
      <View style={styles.textContainer}>
        <ComicText style={styles.title}>Ajouter une tache</ComicText>
      </View>
    </TouchableOpacity>
  );
}

import { styles } from '@/styles/addTaskWidget.styles';

