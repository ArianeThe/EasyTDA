import { theme } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center', // ← centre tout le contenu
    justifyContent: 'flex-start',
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center', // ← centre tout
    padding: 16,
    paddingBottom: 32,
  },

  /* ---------------- HEADER ---------------- */
  header: {
    alignItems: 'center', // ← centre le titre + sous-titre
    marginBottom: 20,
    marginTop: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.textDim,
    fontStyle: 'italic',
    textAlign: 'center',
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
    borderColor: 'rgba(255, 215, 0, 0.4)',
    ...theme.shadows.gold,
    minHeight: 500,

    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
  },

  /* ---------------- WIDGETS ---------------- */
  widgetsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // ← centre la ligne
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
    width: '100%',
  },

  widgetWrapper: {
    alignItems: 'center', // ← centre chaque widget
    justifyContent: 'center',
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
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
    width: '100%',
    alignItems: 'center', // ← centre la section
    marginBottom: 32,
  },

  sectionHeader: {
    width: '100%',
    alignItems: 'center', // ← centre le titre + sous-titre
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.textDim,
    fontWeight: '500',
    textAlign: 'center',
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
    textAlign: 'center',
  },

  emptyStateSubtext: {
    fontSize: 15,
    color: theme.colors.textDim,
    textAlign: 'center',
    lineHeight: 22,
  },

  /* ---------------- FILTRE ---------------- */
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center', // ← centre les icônes
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
    marginTop: 4,
    width: '100%',
  },

  filterText: {
    fontSize: 18,
    opacity: 0.4,
    textAlign: 'center',
  },

  filterActive: {
    opacity: 1,
    textShadowColor: '#FFD700',
    textShadowRadius: 6,
  },

  filterIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});
