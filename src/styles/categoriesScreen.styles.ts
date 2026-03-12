import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 87, 0.3)'
  },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 16, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, letterSpacing: 0.5 },
  headerSpacer: { width: 60 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: 16, paddingBottom: 32 },
  subtitle: { fontSize: 14, color: theme.colors.textDim, marginBottom: 16, fontStyle: 'italic' },
  addButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    marginBottom: 20,
    ...theme.shadows.gold,
    shadowOpacity: 0.2
  },
  addButtonText: { fontSize: 14, fontWeight: '800', color: theme.colors.background, textTransform: 'uppercase' },
  addForm: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.3)'
  },
  formLabel: { fontSize: 14, fontWeight: '700', color: theme.colors.primary, marginBottom: 10, marginTop: 8 },
  input: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  textArea: { minHeight: 80, paddingTop: 12 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  colorChip: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(212, 168, 87, 0.1)' },
  colorChipSelected: { borderWidth: 3.5, borderColor: theme.colors.secondary },
  colorCheckmark: { fontSize: 20, color: theme.colors.white, fontWeight: 'bold' },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    ...theme.shadows.gold
  },
  saveButtonText: { fontSize: 16, fontWeight: '800', color: theme.colors.background, textTransform: 'uppercase' },
  emptyState: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.textDim
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.primary, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: theme.colors.textDim, textAlign: 'center' },
  list: { marginTop: 4 },
  item: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.15)'
  },
  itemContent: { flex: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  colorDot: { width: 14, height: 14, borderRadius: 7, marginRight: 12 },
  itemTextContainer: { flex: 1 },
  itemTitle: { fontSize: 17, fontWeight: '800', color: theme.colors.primary },
  itemDescription: { fontSize: 14, color: theme.colors.textDim, marginTop: 4, lineHeight: 20 },
  itemStats: { fontSize: 12, color: theme.colors.secondary, fontWeight: '700', marginTop: 4 },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 12,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.error
  },
  deleteButtonText: { fontSize: 12, color: theme.colors.error, fontWeight: '700' },
});

