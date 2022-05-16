import { ACTION_TYPES } from 'Store/type';

const initialState = { locations: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_LOCATIONS:
      return { ...state, locations: action.payload };
    case ACTION_TYPES.RESET_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
