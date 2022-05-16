import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import { View, Text } from 'native-base';

import { Images } from 'Theme';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'Navigators/routes';
import styles from './styles';
import useLocationHook from '../../hooks/useLocation';

const FoodItemList = ({ dataArray, position, onPress }) => {
  const { getDistance } = useLocationHook();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const navigateToRestaurant = vendor => {
    if (onPress) {
      onPress(vendor);
    }
    navigation.navigate(Routes.Vendor, { vendor });
  };

  const calculateDistance = async () => {
    const temp =
      dataArray instanceof Array ? dataArray : dataArray?.results || [];
    getDistance(temp, position).then(dis => setData(dis));
    setLoad(false);
  };

  useEffect(async () => {
    if (position?.latitude && position?.longitude) {
      await calculateDistance();
    }
  }, [position]);

  return (
    <ScrollView
      style={styles.list}
      horizontal={true}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {!load &&
        data?.map((deal, index) => {
          return (
            <View
              style={[
                styles.content,
                index === dataArray?.length - 1 ? {} : styles.marginRight
              ]}
              key={index}>
              <TouchableNativeFeedback
                onPress={() => navigateToRestaurant(deal)}>
                <View>
                  <Image
                    source={
                      deal?.img_url
                        ? { uri: deal?.img_url?.split('X-Amz-Algorithm=')[0] }
                        : Images.foodItem
                    }
                    style={styles.imageView}
                  />
                  <View style={styles.titleView}>
                    <View style={styles.descView}>
                      <Text style={styles.textMid}>
                        {deal?.restaurant?.name}
                      </Text>
                      <Text style={[styles.textSmall, styles.sizeText]}>
                        {/*{calculateDistance(deal)}*/}
                        {deal?.distance || '__'}
                      </Text>
                    </View>
                    <View style={styles.descView}>
                      <Text style={styles.textBig}>{deal?.name}</Text>
                      <Text style={styles.textExtra}>${deal?.price}</Text>
                    </View>
                    <View style={styles.descView}>
                      <Text style={styles.textSmall}>
                        02:00P.M. - 05:00P.M.
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default FoodItemList;
