import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI, API_AUTH_URI, API_AUTH_REST } from '@env';
import { ACTION_TYPES } from 'Store/type';
import getRequestErrorMessage from '../../util/index';
import { buildAxiosInstance } from '../../services/axios-instance';

export const userLogin = authData => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.ATTEMPTING_LOGIN,
        payload: true
      });
      const axios = buildAxiosInstance({ baseURL: API_URI });
      // Add a request interceptor
      axios.interceptors.request.use(function (config) {
        delete config.headers.Authorization;
        return config;
      });
      const result = await axios.post('login/', authData);
      if (result?.status === 200) {
        if (result.data.err) {
          dispatch({
            type: ACTION_TYPES.GET_FAIL_USER_AUTH,
            payload: getRequestErrorMessage(result.data.err)
          });
        } else {
          await AsyncStorage.setItem('token', result?.data?.token);
          dispatch({
            type: ACTION_TYPES.GET_SUCCESS_USER_AUTH,
            payload: result.data.user
          });
        }
        if (result.data.user.user_role === 2) {
          dispatch({
            type: ACTION_TYPES.GET_VENDOR,
            payload: result.data.restaurant
          });
        }
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_FAIL_USER_AUTH,
        payload: getRequestErrorMessage(err.response.data)
      });
    }
  };
};

export const userLoginSocial = authData => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.ATTEMPTING_LOGIN,
        payload: true
      });
      const axios = buildAxiosInstance({ baseURL: API_AUTH_URI });
      // Add a request interceptor
      axios.interceptors.request.use(function (config) {
        delete config.headers.Authorization;
        return config;
      });
      const result = await axios.post(
        `${authData.type}/login/`,
        authData.payload
      );
      if (result.status === 200) {
        await AsyncStorage.setItem(
          'token',
          result.data.token ?? result.data.key
        );
        dispatch({
          type: ACTION_TYPES.GET_SUCCESS_USER_AUTH,
          payload: result.data.user
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_FAIL_USER_AUTH,
        payload: getRequestErrorMessage(err.response.data)
      });
    }
  };
};
const resetAuthData = dispatch => {
  dispatch({ type: ACTION_TYPES.RESET_DATA, payload: {} });
};
export const userLogout = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.ATTEMPTING_LOGIN,
        payload: true
      });
      await AsyncStorage.removeItem('token');
      const axios = buildAxiosInstance({ baseURL: API_AUTH_REST });
      const result = await axios.post('logout/');
      if (result.status === 200) {
        resetAuthData(dispatch);
      }
    } catch (err) {
      console.log(err);
      resetAuthData(dispatch);
    }
  };
};
