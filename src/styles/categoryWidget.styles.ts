import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: theme.colors.textDim, marginBottom: 12 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.3)',
  },
  colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  chipTextContainer: { flexDirection: 'row', alignItems: 'center' },
  chipLabel: { fontSize: 14, fontWeight: '600', color: theme.colors.primary, marginRight: 6 },
  chipSubLabel: { fontSize: 12, color: theme.colors.secondary, fontWeight: '700' },
});

