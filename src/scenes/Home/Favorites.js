import React from 'react';
import { Text, View } from 'native-base';

import { FoodItemList } from 'Components';

import styles from './styles';

const Favorites = ({ data, position }) => {
  return (
    <View style={styles.promotionView}>
      {/* <View style={styles.featuredViewLabel}>
        <Text style={styles.titleText}>Your Favorites</Text>
      </View>
      <FoodItemList dataArray={data} position={position} /> */}
    </View>
  );
};

export default Favorites;
