import {
  configureStore,
  createReducer,
  combineReducers
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistedReducer } from 'Services/persistence';
import { REACT_NATIVE_APP_ENV } from '@env';

export default function getStore(globalState) {
  const middleware =
    REACT_NATIVE_APP_ENV === 'development' ? [thunk, logger] : [thunk];

  const appReducer = createReducer(globalState, _ => {
    return globalState;
  });

  const store = configureStore({
    reducer: combineReducers({ global: appReducer, app: persistedReducer }),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
      }).concat(middleware)
  });

  const persistor = persistStore(store);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }
  return { store, persistor };
}
