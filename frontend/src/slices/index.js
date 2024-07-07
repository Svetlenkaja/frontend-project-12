import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { authApi } from '../authApi.js';

export default configureStore({
  reducer: {
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
