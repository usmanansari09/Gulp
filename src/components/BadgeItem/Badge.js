import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { AppText } from 'Components/AppText';
import styles from './styles';

const Badge = ({ img_url, name, description, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.badgeContainer}>
        <View style={styles.badgeImage}>
          <Image
            source={{ uri: img_url.split('X-Amz-Algorithm=')[0] }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.badgeTextContainer}>
          <AppText style={styles.badgeText}>{name}</AppText>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Badge;
