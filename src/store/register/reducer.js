import { ACTION_TYPES } from 'Store/type';

const initialState = { success: '', error: '', loading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SUCCESS_USER_RESGIER:
      return { ...state, success: action.payload, error: '', loading: false };
    case ACTION_TYPES.GET_FAIL_USER_RESGIER:
      return { ...state, error: action.payload, success: '', loading: false };
    case ACTION_TYPES.ATTEMPTING_SIGNUP:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
