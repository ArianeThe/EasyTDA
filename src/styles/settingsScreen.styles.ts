import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, padding: 16, paddingBottom: 32 },
  header: { marginBottom: 24, marginTop: 8 },
  title: { fontSize: 32, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: theme.colors.textDim, fontStyle: 'italic' },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 87, 0.1)'
  },
  rowText: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.primary },
  rowSubtitle: { fontSize: 13, color: theme.colors.textDim, marginTop: 4 },
  backButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  backButtonText: { fontSize: 16, color: theme.colors.primary, fontWeight: '700' },
  headerContent: { marginTop: 4 },
});

