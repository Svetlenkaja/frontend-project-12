/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    resetUser: (state) => {
      state.token = null;
      state.username = '';
    }
  }
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
