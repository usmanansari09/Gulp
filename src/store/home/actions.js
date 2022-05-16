import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URI } from '@env';
import { ACTION_TYPES } from 'Store/type';
import { ToastMessage } from 'Components';

export const getBestValueDeals = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(
        `${API_URI}deal-get/?ordering=price&page_size=20`,
        config
      );
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_BEST_VALUE_DEAL,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_BEST_VALUE_DEAL,
        payload: { results: [] }
      });
    }
  };
};

export const getNewDeals = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(
        `${API_URI}deal-get/?ordering=created_at&page_size=10`,
        config
      );
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_HOME_DATA,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_HOME_DATA,
        payload: { results: [] }
      });
    }
  };
};

export const getFeaturedDeals = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}featured/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_FEATURED_DEAL,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_FEATURED_DEAL,
        payload: { results: [] }
      });
    }
  };
};

export const getFavoriteDeals = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}favorites/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_FAVORITE_DEAL,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_FAVORITE_DEAL,
        payload: { results: [] }
      });
    }
  };
};

export const getNearByDeals = v => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      let position = '';
      position = `latitude=${v.latitude}&longitude=${v.longitude}`;
      const result = await axios.get(
        `${API_URI}near_by/?${position}&max_distance=10`,
        config
      );
      if (result.status === 200 && typeof result.data !== 'string') {
        dispatch({
          type: ACTION_TYPES.GET_NEAR_BY_DEAL,
          payload: result.data.results
            ? result.data
            : { results: result.data instanceof Array ? result.data : [] }
        });
      }
    } catch (err) {
      ToastMessage(err.message, 'danger', 'bottom');
      dispatch({
        type: ACTION_TYPES.GET_NEAR_BY_DEAL,
        payload: { results: [] }
      });
    }
  };
};
export const getTimeline = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}timeline/`, config);
      if (result.status === 200) {        
        dispatch({
          type: ACTION_TYPES.GET_TIMELINE,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_TIMELINE,
        payload: { results: [] }
      });
    }
  };
};

export const getCategories = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}category/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_CATEGORIES,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_CATEGORIES,
        payload: { results: [] }
      });
    }
  };
};

export const getNotifications = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(`${API_URI}notification/`, config);
      if (result.status === 200) {
        dispatch({
          type: ACTION_TYPES.GET_NOTIFICATION,
          payload: result.data
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_NOTIFICATION,
        payload: { results: [] }
      });
    }
  };
};

export const searchDeal = query => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.get(
        `${API_URI}deal-get/?search=${query}`,
        config
      );
      if (result.status === 200) {
        const groupData = result.data.results.reduce(function (r, a) {
          r[a.restaurant.id] = r[a.restaurant.id] || [];
          r[a.restaurant.id].push(a);
          return r;
        }, Object.create(null));

        dispatch({
          type: ACTION_TYPES.GET_SEARCH_DEAL_DATA,
          payload: groupData
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GET_SEARCH_DEAL_DATA,
        payload: []
      });
    }
  };
};
export const createTimeline = requestPayload => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTION_TYPES.HOME_LOADING,
        payload: true
      });
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
      };
      const result = await axios.post(
        `${API_URI}timeline/`,
        requestPayload,
        config
      );
      if (result.status === 201) {
        dispatch({
          type: ACTION_TYPES.HOME_LOADING,
          payload: false
        });
        ToastMessage('Happy Hour was added successfully', 'success', 'bottom');
        dispatch(getTimeline());
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.HOME_LOADING,
        payload: false
      });
      ToastMessage(err.message, 'danger', 'bottom');
    }
  };
};
