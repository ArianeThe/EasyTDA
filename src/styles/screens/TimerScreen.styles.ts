import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  backButtonText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  headerContent: {
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textDim,
    fontStyle: 'italic',
  },
  timerCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  timerLabel: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  timerValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
    fontVariant: ['tabular-nums'],
  },
  timerSubLabel: {
    fontSize: 15,
    color: theme.colors.textDim,
    marginBottom: 24,
    fontWeight: '600',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.gold,
    shadowOpacity: 0.2,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.surfaceLight,
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  buttonTextSecondary: {
    color: theme.colors.primary,
  },
  buttonTextDisabled: {
    color: theme.colors.textDim,
  },
  helperText: {
    fontSize: 13,
    color: theme.colors.textDim,
    marginTop: 8,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  presetRow: {
    flexDirection: 'row',
  },
  presetChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceLight,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
  },
  presetChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  presetText: {
    fontSize: 14,
    color: theme.colors.textDim,
    fontWeight: '700',
  },
  presetTextSelected: {
    color: theme.colors.background,
  },
});


