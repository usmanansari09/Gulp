import { persistReducer } from 'redux-persist';

import rootReducer from '../../store/reducers';
import { persistConfig } from '../../config/persist';

export const persistedReducer = persistReducer(persistConfig, rootReducer);
