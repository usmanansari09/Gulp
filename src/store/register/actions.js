import { ACTION_TYPES } from 'Store/type';
import getRequestErrorMessage from '../../util/index';
import { buildAxiosInstance } from '../../services/axios-instance';
import { API_URI } from '@env';

export const userRegister = userData => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.ATTEMPTING_SIGNUP,
        payload: true
      });
      const axios = buildAxiosInstance({ baseURL: API_URI });
      const result = await axios.post('signup/', userData);
      if (result.status === 201) {
        dispatch({
          type: ACTION_TYPES.GET_SUCCESS_USER_RESGIER,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_FAIL_USER_RESGIER,
        payload: getRequestErrorMessage(err.response.data)
      });
    }
  };
};

export const clear = () => {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.GET_SUCCESS_USER_RESGIER,
      payload: ''
    });
    dispatch({
      type: ACTION_TYPES.GET_FAIL_USER_RESGIER,
      payload: ''
    });
  };
};
