import { ACTION_TYPES } from 'Store/type';

const initialState = { badges: { results: [] }, checkins: { results: [] } };

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_USER_BADGE_DATA:
      return { ...state, badges: action.payload };
    case ACTION_TYPES.GET_USER_CHECKIN_DATA:
      return { ...state, checkins: action.payload };
    case ACTION_TYPES.RESET_DATA:
      return { ...initialState };
    case ACTION_TYPES.GET_SUCCESS_USER_AUTH:
      return { ...state, userInfo: action.payload, loading: false };
    default:
      return state;
  }
};
