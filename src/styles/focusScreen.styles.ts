import { StyleSheet } from 'react-native';
import { theme } from './theme';

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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  headerTextContainer: {
    flex: 1,
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
  cadranCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  focusCard: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.3)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  focusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  focusDescription: {
    fontSize: 16,
    color: theme.colors.textDim,
    marginBottom: 16,
    lineHeight: 24,
  },
  focusMeta: {
    fontSize: 13,
    color: theme.colors.secondary,
    marginBottom: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  doneButton: {
    alignSelf: 'stretch',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButtonCompleted: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.background,
  },
  doneButtonTextCompleted: {
    color: theme.colors.success,
  },
  emptyState: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.textDim,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.textDim,
    textAlign: 'center',
    lineHeight: 20,
  },
});

