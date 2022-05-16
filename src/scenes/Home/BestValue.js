import React from 'react';
import { Text, View } from 'native-base';

import { FoodItemList } from 'Components';

import styles from './styles';

const BestValue = ({ data, position }) => {
  return (
    <View style={styles.promotionView}>
      <View style={styles.featuredViewLabel}>
        <Text style={styles.titleText}>Best Value</Text>
      </View>
      <FoodItemList dataArray={data} position={position} />
    </View>
  );
};

export default BestValue;
