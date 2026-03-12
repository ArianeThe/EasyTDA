import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
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
  backButtonText: { fontSize: 16, color: theme.colors.primary, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  headerSpacer: { width: 60 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: theme.colors.primary, marginBottom: 12 },
  input: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  textArea: { minHeight: 100, paddingTop: 12 },
  priorityRow: { flexDirection: 'row', gap: 10 },
  priorityChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.4)',
    alignItems: 'center'
  },
  priorityChipSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(212, 168, 87, 0.1)'
  },
  priorityLow: {},
  priorityMedium: {},
  priorityHigh: {},
  priorityText: { fontSize: 14, fontWeight: '500', color: theme.colors.textDim },
  priorityTextSelected: { fontWeight: '700', color: theme.colors.primary },
  calendarContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  monthNavButton: { padding: 8 },
  monthNavText: { fontSize: 18, color: theme.colors.primary, fontWeight: 'bold' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  weekDayText: { width: '14.28%', textAlign: 'center', fontSize: 12, color: theme.colors.textDim, fontWeight: '500' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 4
  },
  selectedDayCell: { backgroundColor: theme.colors.primary },
  todayCell: { borderWidth: 1, borderColor: theme.colors.primary },
  dayText: { fontSize: 14, color: theme.colors.primary },
  selectedDayText: { color: theme.colors.background, fontWeight: 'bold' },
  todayText: { color: theme.colors.secondary, fontWeight: '700' },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  dropdownValue: { fontSize: 15, color: theme.colors.primary },
  dropdownArrow: { fontSize: 12, color: theme.colors.primary },
  dropdownList: {
    marginTop: 4,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 8
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 87, 0.1)'
  },
  dropdownItemText: { fontSize: 15, color: theme.colors.primary },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
    padding: 12,
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
  actions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  buttonPrimary: { backgroundColor: theme.colors.primary },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  buttonTextPrimary: { fontSize: 16, fontWeight: '700', color: theme.colors.background },
  buttonTextSecondary: { fontSize: 16, fontWeight: '600', color: theme.colors.primary },
  rowAlignCenter: { flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
});

