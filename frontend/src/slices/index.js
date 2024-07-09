import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { authApi } from '../api/authApi.js';
import { channelsApi } from '../api/channelsApi.js';

export default configureStore({
  reducer: {
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware, authApi.middleware),
});
