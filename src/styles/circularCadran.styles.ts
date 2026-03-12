import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  scrollContent: {
    flexGrow: 1
  },

  cadranWrapper: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16
  },

  /* --- HUD MARVEL : conteneur du cadran --- */
  svgContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    // Taille adaptée au PowerGauge 360
    width: 420,
    height: 420,

    marginBottom: 30,

    // Glow externe façon Jarvis / Iron Man
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 25,
    elevation: 12,
  },

  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  completionPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  completionLabel: {
    fontSize: 14,
    color: theme.colors.textDim,
    marginTop: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1
  },

  /* --- Stats --- */
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },

  statBox: {
    flex: 1,
    alignItems: 'center'
  },

  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4
  },

  statLabel: {
    fontSize: 12,
    color: theme.colors.textDim,
    fontWeight: '700',
    textTransform: 'uppercase'
  },

  statDivider: {
    width: 1,
    height: 44,
    backgroundColor: 'rgba(212, 168, 87, 0.2)',
    marginHorizontal: 8
  },

  /* --- Légende --- */
  legendSection: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.2)',
    ...theme.shadows.gold,
    shadowOpacity: 0.1,
  },

  legendTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1
  },

  /* --- Empty state --- */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: theme.colors.textDim,
    textAlign: 'center'
  },
});
