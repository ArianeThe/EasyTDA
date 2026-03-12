import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  headerContainer: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 87, 0.3)',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 16, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, letterSpacing: 0.5 },
  headerSpacer: { width: 60 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: 16, paddingBottom: 32 },
  subtitle: { fontSize: 14, color: theme.colors.textDim, marginBottom: 16, fontStyle: 'italic' },
  markAllButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    marginBottom: 20,
    ...theme.shadows.gold,
    shadowOpacity: 0.2
  },
  markAllText: { fontSize: 13, fontWeight: '800', color: theme.colors.background, textTransform: 'uppercase' },
  emptyState: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.textDim
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.primary, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: theme.colors.textDim, textAlign: 'center', lineHeight: 20 },
  list: { marginTop: 4 },
  item: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.1)'
  },
  itemUnread: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1.5
  },
  itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.primary },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.secondary },
  itemMessage: { fontSize: 14, color: theme.colors.text, marginBottom: 8, lineHeight: 20 },
  itemMeta: { fontSize: 11, color: theme.colors.textDim, fontWeight: '600' },
});

