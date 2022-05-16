import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';
import { ACTION_TYPES } from 'Store/type';

export const getRestaurantLocations = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}location/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_LOCATIONS,
          payload: result.data.features
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_LOCATIONS,
        payload: []
      });
    }
  };
};
