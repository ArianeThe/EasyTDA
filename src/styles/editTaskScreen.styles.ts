import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  contentContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 8 },
  backButton: { fontSize: 16, color: theme.colors.primary, marginRight: 12, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.primary },
  section: { marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: theme.colors.primary, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surfaceLight
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surfaceLight
  },
  dropdownText: { fontSize: 15, color: theme.colors.primary },
  dropdownArrow: { fontSize: 12, color: theme.colors.primary },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceLight,
    marginTop: 4,
    overflow: 'hidden'
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 87, 0.1)'
  },
  colorDot: { width: 14, height: 14, borderRadius: 7, marginRight: 12 },
  dropdownItemText: { fontSize: 15, color: theme.colors.primary },
  priorityButtons: { flexDirection: 'row', gap: 10 },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.4)',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight
  },
  priorityButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  priorityButtonText: { fontSize: 14, fontWeight: '600', color: theme.colors.textDim },
  priorityButtonTextActive: { color: theme.colors.background },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthButton: { fontSize: 14, color: theme.colors.primary, fontWeight: '700' },
  monthTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.primary },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  dayHeaderText: { fontSize: 13, fontWeight: '600', color: theme.colors.textDim, width: '14.28%', textAlign: 'center' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  dayCell: {
    width: '13.2%', // Precise width for gap
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.1)'
  },
  dayCellSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  dayCellText: { fontSize: 14, color: theme.colors.primary, fontWeight: '500' },
  dayCellTextDisabled: { opacity: 0.2 },
  dayCellTextSelected: { color: theme.colors.background, fontWeight: '700' },
  selectedDate: { fontSize: 14, color: theme.colors.secondary, marginTop: 12, textAlign: 'center', fontWeight: '600' },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 50,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: theme.colors.textDim,
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  notificationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  actionButtons: { marginTop: 32, gap: 16 },
  saveButton: { paddingVertical: 16, borderRadius: 12, backgroundColor: theme.colors.primary, alignItems: 'center', ...theme.shadows.gold },
  saveButtonText: { fontSize: 16, fontWeight: '700', color: theme.colors.background },
  deleteButton: { paddingVertical: 16, borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.error, alignItems: 'center' },
  deleteButtonText: { fontSize: 16, fontWeight: '600', color: theme.colors.error },
  spacer: { height: 60 },
});

