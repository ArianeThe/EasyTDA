import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 168, 87, 0.2)',
    paddingBottom: 24, // Extra padding for safe area logic usually
  },
  navItem: { fontSize: 13, fontWeight: '800', color: theme.colors.primary, textTransform: 'uppercase', letterSpacing: 1 },
});

