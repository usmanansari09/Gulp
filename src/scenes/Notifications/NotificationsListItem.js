import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { AppText } from 'Components/AppText';
import styles from './styles';

const NotificationItem = ({
  img_url,
  title,
  description,
  created_at,
  onPress
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.time}>
          <AppText style={styles.timeLabel}>
            {new Date(created_at).toLocaleString()}
          </AppText>
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationIcon}>
            <Image
              source={{ uri: img_url }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.notificationTitle}>{title}</AppText>
            <AppText style={styles.notificationText}>{description}</AppText>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default NotificationItem;
