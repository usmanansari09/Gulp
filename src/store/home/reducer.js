import { ACTION_TYPES } from 'Store/type';

const initialState = {
  recent_searched_restaurants: [],
  searchData: [],
  categories: { results: [] },
  notification: [],
  timeline: { results: [] },
  near_by_deals: { results: [] },
  new_deals: { results: [] },
  featured_deals: { results: [] },
  best_value_deals: { results: [] },
  favorite_deals: { results: [] },
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ACTION_TYPES.GET_SEARCH_DEAL_DATA:
      return { ...state, searchData: action.payload };
    case ACTION_TYPES.HOME_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.GET_TIMELINE:
      return { ...state, timeline: action.payload };
    case ACTION_TYPES.GET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case ACTION_TYPES.GET_NEAR_BY_DEAL:
      return { ...state, near_by_deals: action.payload };
    case ACTION_TYPES.GET_FEATURED_DEAL:
      return { ...state, featured_deals: action.payload };
    case ACTION_TYPES.GET_BEST_VALUE_DEAL:
      return { ...state, best_value_deals: action.payload };
    case ACTION_TYPES.GET_NEW_DEAL:
      return { ...state, new_deals: action.payload };
    case ACTION_TYPES.GET_FAVORITE_DEAL:
      return { ...state, favorite_deals: action.payload };
    case ACTION_TYPES.ADD_RECENT_SEARCHED_RESTAURANT:
      return {
        ...state,
        recent_searched_restaurants: [
          ...state.recent_searched_restaurants,
          action.payload
        ]
      };
    case ACTION_TYPES.RESET_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
