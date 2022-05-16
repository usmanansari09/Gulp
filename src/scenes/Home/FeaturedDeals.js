import React from 'react';
import { Text, View } from 'native-base';

import { FoodItemList } from 'Components';

import styles from './styles';

const FeaturedDeals = ({ data, position }) => {
  return (
    <View style={styles.featuredView}>
      <View style={styles.featuredViewLabel}>
        <Text style={styles.titleText}>Featured Deals</Text>
      </View>
      <FoodItemList dataArray={data} position={position} />
    </View>
  );
};

export default FeaturedDeals;
