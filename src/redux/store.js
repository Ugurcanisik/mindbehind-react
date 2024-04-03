import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import config from '../config';
import authSlice from './auth';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: [
    authSlice.name
  ],
  blacklist: [],
  transforms: [
    encryptTransform({
      secretKey: config.persistEncryptSecretKey
    })
  ]
};

const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
