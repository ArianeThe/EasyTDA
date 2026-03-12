import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


import { useAppContext } from '@/context/AppContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useTimer } from '@/hooks/useTimer';
import { notificationService } from '@/services/notifications';
import { styles } from '@/styles/settingsScreen.styles';
import { theme } from '@/styles/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { state: appState } = useAppContext();
  const { preferences, updatePreferences } = useNotifications();
  const { pomodoroSettings } = useTimer();

  const isSupported = notificationService.isSupported();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ComicText style={styles.backButtonText}>← Retour</ComicText>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <ComicText style={styles.title}>Paramètres</ComicText>
            <ComicText style={styles.subtitle}>
              Personnalisez le comportement d'EasyTDA.
            </ComicText>
          </View>
        </View>

        {/* Global Support Info */}
        {!isSupported && (
          <View style={[styles.section, { backgroundColor: '#FF525222', borderColor: '#FF5252', borderWidth: 1 }]}>
            <ComicText style={[styles.sectionTitle, { color: '#FF5252' }]}>Compatibilité</ComicText>
            <ComicText style={{ color: theme.colors.text, fontSize: 13 }}>
              Les notifications ne sont pas supportées sur le Web. Utilisez l'application mobile pour cette fonctionnalité.
            </ComicText>
          </View>
        )}

        {/* Theme section */}
        <View style={styles.section}>
          <ComicText style={styles.sectionTitle}>Apparence</ComicText>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Thème sombre</ComicText>
              <ComicText style={styles.rowSubtitle}>
                {appState.settings.theme.mode === 'dark' ? 'Activé' : 'Désactivé'}
              </ComicText>
            </View>
            <Switch value={appState.settings.theme.mode === 'dark'} disabled={true} />
          </View>
        </View>

        {/* Pomodoro section */}
        <View style={styles.section}>
          <ComicText style={styles.sectionTitle}>Pomodoro</ComicText>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Durée de travail</ComicText>
              <ComicText style={styles.rowSubtitle}>
                {pomodoroSettings.workDuration} minutes
              </ComicText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Durée de pause</ComicText>
              <ComicText style={styles.rowSubtitle}>
                {pomodoroSettings.breakDuration} minutes
              </ComicText>
            </View>
          </View>
        </View>

        {/* Notifications section */}
        <View style={styles.section}>
          <ComicText style={styles.sectionTitle}>Notifications</ComicText>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Rappels de tâches</ComicText>
              <ComicText style={styles.rowSubtitle}>
                Alerte avant le début d'une tâche
              </ComicText>
            </View>
            <Switch
              value={preferences.enableTaskReminders}
              onValueChange={(val) => updatePreferences({ enableTaskReminders: val })}
              disabled={!isSupported}
              trackColor={{ false: theme.colors.surfaceLight, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Délai du rappel</ComicText>
              <ComicText style={styles.rowSubtitle}>
                {preferences.notificationTime} minutes avant
              </ComicText>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <ComicText style={styles.rowTitle}>Alarmes Timer</ComicText>
              <ComicText style={styles.rowSubtitle}>
                Alerte à la fin d'un cycle Pomodoro
              </ComicText>
            </View>
            <Switch
              value={preferences.enableTimerAlarms}
              onValueChange={(val) => updatePreferences({ enableTimerAlarms: val })}
              disabled={!isSupported}
              trackColor={{ false: theme.colors.surfaceLight, true: theme.colors.primary }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}



