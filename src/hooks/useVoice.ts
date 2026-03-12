import { voiceService } from '@/services/voiceRecognition';
import { Task } from '@/types/task';
import { useCallback, useState } from 'react';
import { useTasks } from './useTasks';

export const useVoice = () => {
  const { addTask } = useTasks();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Start voice recognition
  const startListening = useCallback(async () => {
    try {
      setIsListening(true);
      setTranscript('');
      setError(null);
      // Note: In a real app, you would integrate with expo-speech or react-native-voice
      // This is a placeholder for the logic
    } catch (err) {
      setError('Failed to start listening');
      setIsListening(false);
    }
  }, []);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    try {
      setIsListening(false);
      // Note: Stop the actual voice recognition service
    } catch (err) {
      setError('Failed to stop listening');
    }
  }, []);

  // Parse transcript to extract task data
  const parseTranscript = useCallback((text: string) => {
    return voiceService.parseTranscript(text);
  }, []);

  // Create task from voice input
  const createTaskFromVoice = useCallback(
    (voiceText: string): Task | null => {
      try {
        const parsed = parseTranscript(voiceText);
        const newTask = addTask({
          title: parsed.title,
          categoryId: parsed.categoryId,
          priority: parsed.priority,
        });

        // Update with priority and duration if detected
        if (parsed.priority || parsed.estimatedDuration) {
          // This would require updating the task with the hook's updateTask
          // For now, we return the task
        }

        return newTask;
      } catch (err) {
        setError('Failed to create task from voice');
        return null;
      }
    },
    [addTask, parseTranscript]
  );

  // Speak text using voice service
  const speak = useCallback(async (text: string) => {
    try {
      await voiceService.speak(text);
    } catch (err) {
      setError('Failed to speak');
    }
  }, []);

  // Stop speaking
  const stopSpeaking = useCallback(async () => {
    try {
      await voiceService.stop();
    } catch (err) {
      setError('Failed to stop speaking');
    }
  }, []);

  return {
    // State
    isListening,
    transcript,
    error,

    // Actions
    startListening,
    stopListening,
    parseTranscript,
    createTaskFromVoice,
    speak,
    stopSpeaking,
    setTranscript,
    setError,
  };
};

