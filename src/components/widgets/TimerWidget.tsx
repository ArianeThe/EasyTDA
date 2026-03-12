import { styles } from '@/styles/timerWidget.styles';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const FocusIcon = require('@/../assets/icons/focus-icon.png');

interface TimerWidgetProps {
  onPress: () => void;
}

export default function TimerWidget({ onPress }: TimerWidgetProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconSquare}>
        <Image source={FocusIcon} style={styles.iconImage} />
      </View>
      <View style={styles.textContainer}>
        <ComicText style={styles.title}>Focus</ComicText>
      </View>
    </TouchableOpacity>
  );
}



