import { createSlice } from '@reduxjs/toolkit';

export const defaultChannelId = 1;

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    setChannels(state, { payload }) {
      return {
        ...state, channels: payload,
      };
    },
    setCurrentChannelId(state, { payload }) {
      return {
        ...state, currentChannelId: payload,
      };
    },
  },
});

export const {
  setCurrentChannelId,
  setChannels,
} = channelSlice.actions;

export default channelSlice.reducer;
