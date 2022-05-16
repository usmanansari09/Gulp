import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';
import { ACTION_TYPES } from 'Store/type';
import { ToastMessage } from 'Components';
import getRequestErrorMessage from '../../util/index';

export const createNewDeal = (requestPayload, callback) => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: true
      });
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.post(
        `${API_URI}deal/`,
        requestPayload,
        config
      );
      if (result.status === 201) {
        dispatch({
          type: ACTION_TYPES.CREATE_DEAL,
          payload: result.data
        });
        callback();
        dispatch(getVendorDeals());
        ToastMessage('New deal was added successfully', 'success', 'bottom');
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: false
      });
      ToastMessage(
        getRequestErrorMessage(err.response.data),
        'danger',
        'bottom'
      );
    }
  };
};
export const editDeal = (requestPayload, id, callback) => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: true
      });
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.put(
        `${API_URI}deal/${id}/`,
        requestPayload,
        config
      );
      if (result.status === 200) {
        callback();
        dispatch(getVendorDeals());
        dispatch({
          type: ACTION_TYPES.DEAL_LOADING,
          payload: false
        });
        ToastMessage('Deal was updated successfully', 'success', 'bottom');
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: false
      });
      ToastMessage(
        getRequestErrorMessage(err.response?.data || err.message),
        'danger',
        'bottom'
      );
    }
  };
};
export const getVendorDeals = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: true
      });
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}deal/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.RECENT_DEAL,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.DEAL_LOADING,
        payload: false
      });
      ToastMessage(
        getRequestErrorMessage(err.response.data),
        'danger',
        'bottom'
      );
    }
  };
};
