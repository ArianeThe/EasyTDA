import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.15)',
    ...theme.shadows.gold,
    shadowOpacity: 0.05,
  },
  itemCompleted: { opacity: 0.5 },
  itemContent: { flex: 1, marginRight: 12 },
  toggleArea: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: theme.colors.primary, marginBottom: 4 },
  titleCompleted: { textDecorationLine: 'line-through', color: theme.colors.textDim },
  description: { fontSize: 13, color: theme.colors.textDim, lineHeight: 18 },
  rightSection: { alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column', gap: 6 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(212, 168, 87, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.3)',
    marginBottom: 4
  },
  statusText: { fontSize: 10, fontWeight: '800', color: theme.colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  focusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
    marginBottom: 4
  },
  focusButtonText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.error
  },
  deleteButtonText: { fontSize: 11, fontWeight: '700', color: theme.colors.error },
  separator: { height: 12 },
});

