import { createSlice } from "@reduxjs/toolkit";

const defaultChannel = { 
  id: 1, 
  name: 'general', 
  removable: false 
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    currentChannel: defaultChannel
  },
  reducers: {
    setChannels(state, { payload }) {
      return {
        ...state, channels: payload,
      }
    },
    setCurrentChannel(state, { payload }) {
      return {
        ...state, currentChannel: payload,
      };
    },
  },
});

export const { setCurrentChannel, setChannels } = appSlice.actions;

export default appSlice.reducer;