import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const NotifyIcon = require('@/../assets/icons/notify-icon.png');

import { useNotifications } from '@/hooks/useNotifications';
import { styles } from '@/styles/notificationsScreen.styles';

export default function NotificationsScreen() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    loadNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const isEmpty = !notifications || notifications.length === 0;

  return (
    <View style={styles.container}>
      {/* Header with Back button */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ComicText style={styles.backButtonText}>← Back</ComicText>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 16 }}>
          <Image source={NotifyIcon} style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 8 }} />
          <ComicText style={styles.headerTitle}>Notifications</ComicText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Subtitle */}
          <ComicText style={styles.subtitle}>
            {unreadCount} Non lue{unreadCount !== 1 ? 's' : ''}
          </ComicText>

          {/* Mark all as read */}
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={markAllAsRead}
            >
              <ComicText style={styles.markAllText}>Marquer comme tout lu</ComicText>
            </TouchableOpacity>
          )}

          {/* Content */}
          {isEmpty ? (
            <View style={styles.emptyState}>
              <ComicText style={styles.emptyTitle}>Aucune notification</ComicText>
              <ComicText style={styles.emptySubtitle}>
                Vous verrez vos rappels et alertes ici.
              </ComicText>
            </View>
          ) : (
            <View style={styles.list}>
              {notifications.map((notif) => {
                const isUnread = !notif.read;
                return (
                  <TouchableOpacity
                    key={notif.id}
                    style={[
                      styles.item,
                      isUnread && styles.itemUnread,
                    ]}
                    onPress={() => markAsRead(notif.id)}
                  >
                    <View style={styles.itemHeader}>
                      <ComicText style={styles.itemTitle}>{notif.title}</ComicText>
                      {isUnread && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                    <ComicText style={styles.itemMessage}>{notif.message}</ComicText>
                    <ComicText style={styles.itemMeta}>
                      {new Date(notif.createdAt).toLocaleString()}
                    </ComicText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


