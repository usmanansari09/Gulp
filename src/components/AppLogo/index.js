import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { Images } from 'Theme';

export default ({ imgStyle, containerStyle }) => {
  return (
    <View style={containerStyle ?? styles.logoView}>
      <Image source={Images.logo} style={imgStyle ?? styles.logoImg} />
    </View>
  );
};
