import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'transparent', // ← IMPORTANT pour fond bleu nuit
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 87, 0.15)',
    ...theme.shadows.gold,
    shadowOpacity: 0.05,
  },

  itemCompleted: { opacity: 0.5 },

  /* --- ZONE GAUCHE --- */
  leftZone: {
    flex: 1,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },

  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textDim,
  },

  description: {
    fontSize: 13,
    color: theme.colors.textDim,
    lineHeight: 18,
  },

  energyIcon: {
    fontSize: 18,
    marginLeft: 4,
  },

  /* --- ZONE DROITE --- */
  rightZone: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 6,
    backgroundColor: 'transparent',
  },

  /* Bouton statut (icône comics) */
  statusButton: {
    padding: 0,
    backgroundColor: 'transparent',
  },

  statusIcon: {
    width: 80,      
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },

  /* Bouton supprimer */
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: 'transparent',
  },

  deleteButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.error,
  },

  separator: { height: 12 },
});
