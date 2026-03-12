export const theme = {
    colors: {
        background: '#0A0F1F',      // Midnight Blue
        surface: '#12182B',         // Lighter Midnight Blue (Cards, Widgets)
        surfaceLight: '#1B2440',    // Even lighter for interactions
        primary: '#D4A857',         // Main Gold
        secondary: '#F2C76E',       // Luminous Gold (Accents)
        text: '#D4A857',            // Gold for text
        textDim: '#A98644',         // Dimmer gold for secondary text
        white: '#FFFFFF',
        border: '#D4A857',          // Gold border
        shadow: '#D4A857',          // Gold shadow
        error: '#FF5252',
        success: '#4CAF50',
        overlay: 'rgba(10, 15, 31, 0.8)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        round: 9999,
    },
    shadows: {
        gold: {
            shadowColor: '#D4A857',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
        },
    },
};
