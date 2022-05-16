import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';
import { ACTION_TYPES } from 'Store/type';
import getRequestErrorMessage from '../../util/index';
import { ToastMessage } from 'Components';

export const getBadges = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}badge/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_USER_BADGE_DATA,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_USER_BADGE_DATA,
        payload: { results: [] }
      });
    }
  };
};

export const getCheckins = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}checkin/`, config);
      if (result.status === 200 && typeof result.data !== 'string') {
        dispatch({
          type: ACTION_TYPES.GET_USER_CHECKIN_DATA,
          payload: { results: result.data }
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_USER_CHECKIN_DATA,
        payload: { results: [] }
      });
    }
  };
};

export const updateVendorProfile = data => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.post(`${API_URI}restaurant/`, data, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.UPDATE_RESTAURANT,
          payload: [result.data]
        });
        ToastMessage('Profile Updated', 'success', 'bottom');
      }
    } catch (err) {
      ToastMessage(
        getRequestErrorMessage(err.response ? err.response.data : err.message),
        'danger',
        'bottom'
      );
    }
  };
};

export const EditCustomerProfile = data => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      };
      const result = await axios.post(`${API_URI}profile/`, data);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_SUCCESS_USER_AUTH,
          payload: result.data
        });
        ToastMessage('Profile Updated', 'success', 'bottom');
      }
    } catch (err) {
      ToastMessage(
        getRequestErrorMessage(err.response ? err.response.data : err.message),
        'danger',
        'bottom'
      );
    }
  };
};
