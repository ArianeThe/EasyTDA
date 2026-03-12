import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  iconSquare: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 168, 87, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  iconText: { fontSize: 22 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    paddingHorizontal: 5,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.surface,
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: theme.colors.background },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: theme.colors.primary, marginBottom: 2 },
  subtitle: { fontSize: 13, color: theme.colors.textDim, fontWeight: '500' },
});

