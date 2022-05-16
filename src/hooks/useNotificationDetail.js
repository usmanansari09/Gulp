import React, { useLayoutEffect, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomHeader from 'Components/CustomHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';

export const useNotificationDetailsPresenter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { notification } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader
          title={notification.title}
          showBackButton={true}
          onBackPress={navigation.goBack}
        />
      ),
      headerStyle: { backgroundColor: 'transparent' }
    });
  }, [navigation]);

  const markAsRead = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      await axios.put(
        `${API_URI}notification/${notification.id}`,
        { read_status: true },
        config
      );
    } catch (err) {}
  };
  useEffect(() => {
    setTimeout(() => markAsRead(), 100);
  }, []);

  return {
    notification
  };
};
