import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';

import { useNotificationDetailsPresenter } from 'Hooks/useNotificationDetail';

import { AppText } from 'Components/AppText';

export default () => {
  const { notification } = useNotificationDetailsPresenter();

  return (
    <ScrollView style={styles.previewContainer}>
      <View style={styles.noteFullText}>
        <AppText>{notification.description}</AppText>
      </View>
      <View style={styles.noteFullText}>
        <View style={[styles.paddingRight, { flexDirection: 'row' }]}>
          <AppText numberOfLines={1} style={[styles.timeLabel]}>
            {notification.created_at.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })}
          </AppText>
          <View>
            <View style={styles.dotSeparator} />
          </View>
          <AppText style={[styles.timeLabel]}>
            {new Date(notification.created_at).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
};
