import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import childrenReducer from './children/childrenReducer';
import habitReducer from './habit/habitReducer';
import taskReducer from './tasks/taskReducer';

import storage from 'redux-persist/lib/storage';
import userGifts from './gifts/giftReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'refreshToken'],
};

// const childrenPersistConfig = {
//   key: 'children',
//   storage,
// };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    children: childrenReducer,
    habits: habitReducer,
    tasks: taskReducer,
    gifts: userGifts,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
