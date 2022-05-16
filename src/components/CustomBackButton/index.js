import React from 'react';
import { View, TouchableNativeFeedback, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';

const CustomBackButton = ({ onPress, style }) => {
  const button = (
    <View style={style ?? styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <Icon type="SimpleLineIcons" name="arrow-left" style={styles.backBtn} />
      </TouchableNativeFeedback>
    </View>
  );
  return style ? button : <SafeAreaView>{button}</SafeAreaView>;
};

export default CustomBackButton;
