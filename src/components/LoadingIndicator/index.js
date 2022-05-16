import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Colors } from 'Theme';
import styles from './styles';

export default ({ size, visible = false }) =>
  visible === true ? (
    <View style={styles.container}>
      <View style={{ width: 15, height: 15, alignSelf: 'center' }}>
        <ActivityIndicator
          testID="activity-indicator"
          color={Colors.orange}
          size={size ?? 'large'}
        />
      </View>
    </View>
  ) : (
    <></>
  );
