import { ACTION_TYPES } from 'Store/type';

const initialState = {
  userInfo: {},
  errMessage: '',
  loading: false,
  restaurant: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SUCCESS_USER_AUTH:
      return { ...state, userInfo: action.payload, loading: false };
    case ACTION_TYPES.GET_FAIL_USER_AUTH:
      return {
        ...state,
        userInfo: {},
        errMessage: action.payload,
        loading: false
      };
    case ACTION_TYPES.ATTEMPTING_LOGIN:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.GET_VENDOR:
      return { ...state, restaurant: action.payload };
    case ACTION_TYPES.UPDATE_RESTAURANT:
      return { ...state, restaurant: action.payload };
    case ACTION_TYPES.RESET_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
