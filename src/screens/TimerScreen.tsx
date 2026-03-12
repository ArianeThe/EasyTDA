import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const FocusIcon = require('@/../assets/icons/focus-icon.png');

import { useTimer } from '@/hooks/useTimer';
import { styles } from '@/styles/screens/TimerScreen.styles';

export default function TimerScreen() {
  const router = useRouter();
  const {
    currentSession,
    pomodoroSettings,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useTimer();

  const [duration, setDuration] = useState<number>(pomodoroSettings.workDuration);

  useEffect(() => {
    setDuration(pomodoroSettings.workDuration);
  }, [pomodoroSettings.workDuration]);

  const elapsedMinutes = useMemo(() => {
    if (!currentSession) return 0;
    return Math.floor(currentSession.elapsed / 60);
  }, [currentSession]);

  const remaining = useMemo(() => {
    if (!currentSession) return duration;
    const left = currentSession.duration - elapsedMinutes;
    return left > 0 ? left : 0;
  }, [currentSession, duration, elapsedMinutes]);

  const handleStart = () => {
    if (!currentSession) {
      startTimer(duration, undefined, 'pomodoro');
    }
  };

  const handlePauseResume = () => {
    if (!currentSession) return;
    if (isPaused || !isRunning) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  };

  const handleReset = () => {
    stopTimer();
  };

  const formatMinutes = (mins: number) => mins.toString().padStart(2, '0');

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
            <ComicText style={styles.backButtonText}>← Back</ComicText>
          </TouchableOpacity>
          <View style={[styles.headerContent, { alignItems: 'center' }]}>
            <Image source={FocusIcon} style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 12 }} />
            <ComicText style={styles.title}>Focus Timer</ComicText>
            <ComicText style={styles.subtitle}>Sessions de concentration Pomodoro</ComicText>
          </View>
        </View>

        {/* Timer card */}
        <View style={styles.timerCard}>
          <ComicText style={styles.timerLabel}>
            {currentSession?.type === 'break' ? 'Break' : 'Focus'}
          </ComicText>
          <ComicText style={styles.timerValue}>
            {formatMinutes(remaining)}:00
          </ComicText>
          <ComicText style={styles.timerSubLabel}>
            {isRunning
              ? 'Running'
              : currentSession
                ? isPaused
                  ? 'Paused'
                  : 'Stopped'
                : 'Ready to start'}
          </ComicText>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[
                styles.button,
                (currentSession || isRunning) && styles.buttonSecondary,
              ]}
              onPress={handleStart}
              disabled={!!currentSession}
            >
              <ComicText
                style={[
                  styles.buttonText,
                  (currentSession || isRunning) && styles.buttonTextSecondary,
                ]}
              >
                Start
              </ComicText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                !currentSession && styles.buttonDisabled,
              ]}
              onPress={handlePauseResume}
              disabled={!currentSession}
            >
              <ComicText
                style={[
                  styles.buttonText,
                  !currentSession && styles.buttonTextDisabled,
                ]}
              >
                {isPaused || !isRunning ? 'Resume' : 'Pause'}
              </ComicText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                !currentSession && styles.buttonDisabled,
              ]}
              onPress={handleReset}
              disabled={!currentSession}
            >
              <ComicText
                style={[
                  styles.buttonText,
                  !currentSession && styles.buttonTextDisabled,
                ]}
              >
                Reset
              </ComicText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Duration presets */}
        <View style={styles.section}>
          <ComicText style={styles.sectionTitle}>Session length</ComicText>
          <View style={styles.presetRow}>
            {[15, pomodoroSettings.workDuration, 45].map((value) => {
              const selected = duration === value;
              return (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.presetChip,
                    selected && styles.presetChipSelected,
                  ]}
                  onPress={() => setDuration(value)}
                  disabled={!!currentSession}
                >
                  <ComicText
                    style={[
                      styles.presetText,
                      selected && styles.presetTextSelected,
                    ]}
                  >
                    {value} min
                  </ComicText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

