import * as Speech from 'expo-speech';

export interface VoiceRecognitionResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export const voiceService = {
  // Check if speech recognition is available
  async isAvailable(): Promise<boolean> {
    try {
      return await Speech.isSpeakingAsync ? true : false;
    } catch (error) {
      console.error('Error checking speech availability:', error);
      return false;
    }
  },

  // Parse voice transcript for task creation
  parseTranscript(transcript: string): {
    title: string;
    priority?: 'low' | 'medium' | 'high';
    categoryId?: string;
    estimatedDuration?: number;
  } {
    const lowerTranscript = transcript.toLowerCase();
    
    // Extract priority
    let priority: 'low' | 'medium' | 'high' = 'medium';
    if (
      lowerTranscript.includes('urgent') ||
      lowerTranscript.includes('important') ||
      lowerTranscript.includes('asap')
    ) {
      priority = 'high';
    } else if (
      lowerTranscript.includes('soon') ||
      lowerTranscript.includes('normal')
    ) {
      priority = 'medium';
    } else if (
      lowerTranscript.includes('later') ||
      lowerTranscript.includes('low priority')
    ) {
      priority = 'low';
    }

    // Extract duration (e.g., "15 minutes", "1 hour")
    const durationMatch = transcript.match(/(\d+)\s*(minute|hour|min|h)/i);
    let estimatedDuration: number | undefined;
    if (durationMatch) {
      const value = parseInt(durationMatch[1], 10);
      const unit = durationMatch[2].toLowerCase();
      estimatedDuration =
        unit === 'hour' || unit === 'h' ? value * 60 : value;
    }

    return {
      title: transcript,
      priority,
      estimatedDuration,
    };
  },

  // Speak text
  async speak(text: string): Promise<void> {
    try {
      await Speech.speak(text, { language: 'en' });
    } catch (error) {
      console.error('Error speaking:', error);
    }
  },

  // Stop speaking
  async stop(): Promise<void> {
    try {
      await Speech.stop();
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  },
};

