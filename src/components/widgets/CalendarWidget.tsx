import { styles } from '@/styles/calendarWidget.styles';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const CalendarIcon = require('@/../assets/icons/calendar-icon.png');

interface CalendarWidgetProps {
  onPress: () => void;
}

export default function CalendarWidget({ onPress }: CalendarWidgetProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconSquare}>
        <Image source={CalendarIcon} style={styles.iconImage} />
      </View>
      <View style={styles.textContainer}>
        <ComicText style={styles.title}>Calendrier</ComicText>
      </View>
    </TouchableOpacity>
  );
}

