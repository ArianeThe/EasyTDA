import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';

import Svg, { Circle, G } from 'react-native-svg';

import { useCadran } from '@/hooks/useCadran';
import { styles } from '@/styles/circularCadran.styles';
import { theme } from '@/styles/theme';
import { CadranLegend } from './CadranLegend';
import { CadranProgress } from './CadranProgress';
import { CadranSegment } from './CadranSegment';

interface CircularCadranProps {
  tasks?: any[];
  size?: number;
  strokeWidth?: number;
}

export const CircularCadran: React.FC<CircularCadranProps> = ({
  tasks,
  size = 280,
  strokeWidth = 20,
}) => {
  // Use hook to get cadran data
  const { metrics, config } = useCadran(tasks);

  // Memoized segments
  const segments = useMemo(() => {
    return config.segments;
  }, [config.segments]);

  const completionPercentage = useMemo(() => {
    return config.completionPercentage;
  }, [config.completionPercentage]);

  // Cadran radius (inner)
  const innerRadius = size / 2 - strokeWidth - 15;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cadranWrapper}>
        {/* SVG Cadran */}
        <View style={styles.svgContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 10}
              fill={theme.colors.surfaceLight}
              opacity={0.3}
            />

            {/* Progress arc (inner) */}
            <CadranProgress
              percentage={completionPercentage}
              size={size}
              strokeWidth={2}
              color={theme.colors.secondary}
              innerRadius={innerRadius}
            />

            {/* Segments */}
            <G>
              {segments.map((segment) => (
                <CadranSegment
                  key={segment.id}
                  id={segment.id}
                  startAngle={segment.startAngle}
                  endAngle={segment.endAngle}
                  color={segment.color}
                  size={size}
                  strokeWidth={strokeWidth}
                  label={segment.label}
                  value={segment.value}
                />
              ))}
            </G>
          </Svg>

          {/* Center content */}
          <View style={styles.centerContent}>
            <ComicText style={styles.completionPercentage}>
              {Math.round(completionPercentage)}%
            </ComicText>
            <ComicText style={styles.completionLabel}>Restant</ComicText>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <ComicText style={styles.statValue}>{metrics.total}</ComicText>
            <ComicText style={styles.statLabel}>Total des taches</ComicText>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <ComicText style={styles.statValue}>{metrics.completed}</ComicText>
            <ComicText style={styles.statLabel}>Terminées</ComicText>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <ComicText style={styles.statValue}>{metrics.pending}</ComicText>
            <ComicText style={styles.statLabel}>En attente</ComicText>
          </View>
        </View>

        {/* Legend */}
        {segments.length > 0 && (
          <View style={styles.legendSection}>
            <ComicText style={styles.legendTitle}>Statut des taches</ComicText>
            <CadranLegend segments={segments} />
          </View>
        )}

        {/* Empty state */}
        {segments.length === 0 && (
          <View style={styles.emptyState}>
            <ComicText style={styles.emptyStateText}>Pas encore de taches</ComicText>
            <ComicText style={styles.emptyStateSubtext}>
              Crée ta première tache pour voir le cadran
            </ComicText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};


