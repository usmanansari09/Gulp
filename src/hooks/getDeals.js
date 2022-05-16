import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { API_URI } from '@env';
import { Routes } from 'Navigators/routes';
import CustomHeader from 'Components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGetDeals = () => {
  const navigation = useNavigation();
  const { userInfo, restaurant } = useSelector(state => ({
    userInfo: state.app.login.userInfo,
    restaurant: state.app.login.restaurant
      ? state.app.login.restaurant[0]
      : undefined
  }));
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState({ results: [] });

  const route = useRoute();
  const { category } = route.params;
  const navigateToRestaurant = vendor => {
    navigation.navigate(Routes.Vendor, { vendor });
  };

  const getDeals = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(
        `${API_URI}deal-get/?${
          category ? `category__name=${category.name}` : ''
        }${restaurant ? `&restaurant__id=${restaurant.id}` : ''}`,
        config
      );

      if (result.status === 200 && typeof result.data !== 'string') {
        setDeals(result.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getDeals();
    }
  }, [userInfo]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title="Deals"
          showBackButton
          onBackPress={navigation.goBack}
        />
      )
    });
  }, []);

  return {
    loading,
    deals,
    navigateToRestaurant,
    category
  };
};
export default useGetDeals;
