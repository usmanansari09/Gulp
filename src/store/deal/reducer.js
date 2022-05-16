import { ACTION_TYPES } from 'Store/type';

const dealInitialState = {
  dealData: [],
  loading: false
};

export default (state = dealInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.DEAL_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.CREATE_DEAL:
      return {
        ...state,
        dealData: [...state.dealData, action.payload],
        loading: false
      };
    case ACTION_TYPES.RECENT_DEAL:
      return { ...state, dealData: action.payload, loading: false };
    case ACTION_TYPES.RESET_DATA:
      return { ...dealInitialState };
    default:
      return state;
  }
};
