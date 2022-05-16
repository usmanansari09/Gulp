import React from 'react';
import { Text, View } from 'native-base';

import { FoodItemList } from 'Components';

import styles from './styles';

const Gulps = ({ data, position }) => {
  return (
    <View style={styles.promotionView}>
      {/* <View style={styles.featuredViewLabel}>
        <Text style={styles.titleText}>New on Gulp</Text>
      </View> */}
      {/* <FoodItemList dataArray={data} position={position} /> */}
    </View>
  );
};

export default Gulps;
