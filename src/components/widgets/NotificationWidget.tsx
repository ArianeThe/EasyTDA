import { styles } from '@/styles/notificationWidget.styles';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ComicText from '@/components/ui/ComicText';


const NotifyIcon = require('@/../assets/icons/notify-icon.png');

interface NotificationWidgetProps {
  onPress: () => void;
  unreadCount: number;
}

export default function NotificationWidget({
  onPress,
  unreadCount,
}: NotificationWidgetProps) {
  const hasUnread = unreadCount > 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconSquare}>
        <Image source={NotifyIcon} style={styles.iconImage} />
        {hasUnread && (
          <View style={styles.badge}>
            <ComicText style={styles.badgeText}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </ComicText>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <ComicText style={styles.title}>Notif'</ComicText>
        <ComicText style={styles.subtitle}>
          {hasUnread ? `${unreadCount} unread` : 'tout est à jour'}
        </ComicText>
      </View>
    </TouchableOpacity>
  );
}



