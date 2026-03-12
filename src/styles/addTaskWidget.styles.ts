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
  iconCircle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  iconImage: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  iconText: { color: theme.colors.background, fontSize: 26, fontWeight: 'bold' },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: theme.colors.primary, marginBottom: 2 },
  subtitle: { fontSize: 13, color: theme.colors.textDim, fontWeight: '500' },
});

