import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice.js';
import app from './appSlice.js';
import { authApi } from '../api/authApi.js';
import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';

export default configureStore({
  reducer: {
    auth,
    app,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware, authApi.middleware, messagesApi.middleware),
});
