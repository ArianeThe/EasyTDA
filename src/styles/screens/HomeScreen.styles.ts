import { theme } from '@/styles/theme';
import { StyleSheet } from 'react-native';

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

  /* ---------------- HEADER ---------------- */
  header: {
    marginBottom: 20,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textDim,
    fontStyle: 'italic',
  },

  /* ---------------- STATS BAR ---------------- */
  statsBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textDim,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(212, 168, 87, 0.2)',
    marginHorizontal: 8,
  },

  /* ---------------- CADRAN HUD MARVEL ---------------- */
  cadranContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 200,
    padding: 40,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)', // Glow or
    ...theme.shadows.gold,
    minHeight: 500,

    // Glow externe façon HUD Marvel
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,

    elevation: 12,
  },

  /* ---------------- WIDGETS ---------------- */
  widgetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 20,
  },
  widgetWrapper: {
    flex: 1,
  },

  iconButton: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 168, 87, 0.5)',
    ...theme.shadows.gold,
    shadowOpacity: 0.35,
    width: 140,
    height: 140,
  },

  bigIcon: {
    width: '100%',
    height: '100%',
  },

  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
    zIndex: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.background,
  },

  /* ---------------- TASKS ---------------- */
  tasksSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.textDim,
    fontWeight: '500',
  },

  emptyState: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.textDim,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 15,
    color: theme.colors.textDim,
    textAlign: 'center',
    lineHeight: 22,
  },
});
