import React from 'react';
import { Text, View } from 'native-base';

import { FoodItemList } from 'Components';

import styles from './styles';

const Promotions = ({ data, position }) => {
  return (
    <View style={styles.promotionView}>
      <View style={styles.featuredViewLabel}>
        <Text style={styles.titleText}>Nearby Promotions</Text>
      </View>
      <FoodItemList dataArray={data} position={position} />
    </View>
  );
};

export default Promotions;
