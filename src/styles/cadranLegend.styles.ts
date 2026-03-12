import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(212, 168, 87, 0.15)' },
  legendItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 0 },
  colorDot: { width: 14, height: 14, borderRadius: 7, marginRight: 16 },
  labelContainer: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700', color: theme.colors.primary, marginBottom: 2 },
  value: { fontSize: 13, color: theme.colors.textDim, fontWeight: '500' },
  percentage: { fontSize: 14, fontWeight: '800', color: theme.colors.secondary, minWidth: 44, textAlign: 'right' },
});

