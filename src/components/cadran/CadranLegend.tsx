import { CadranSegment as CadranSegmentType } from '@/hooks/useCadran';
import { styles } from '@/styles/cadranLegend.styles';
import React from 'react';
import { View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


interface CadranLegendProps {
  segments: CadranSegmentType[];
}

export const CadranLegend: React.FC<CadranLegendProps> = ({ segments }) => {
  if (segments.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {segments.map((segment) => (
        <View key={segment.id} style={styles.legendItem}>
          {/* Color dot */}
          <View
            style={[
              styles.colorDot,
              { backgroundColor: segment.color },
            ]}
          />

          {/* Label and value */}
          <View style={styles.labelContainer}>
            <ComicText style={styles.label}>{segment.label}</ComicText>
            <ComicText style={styles.value}>
              {segment.value} {segment.value === 1 ? 'task' : 'tasks'}
            </ComicText>
          </View>

          {/* Percentage */}
          <ComicText style={styles.percentage}>{segment.percentage.toFixed(0)}%</ComicText>
        </View>
      ))}
    </View>
  );
};

 
