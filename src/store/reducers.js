import { combineReducers } from 'redux';
import login from './login/reducer';
import register from './register/reducer';
import home from './home/reducer';
import map from './map/reducer';
import deal from './deal/reducer';
import profile from './profile/reducer';

const appReducer = combineReducers({
  login: login,
  register: register,
  home: home,
  map: map,
  deal: deal,
  profile: profile
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
