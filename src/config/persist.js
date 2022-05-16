import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  blacklist: ['timeline', 'notification', 'searchData']
};
