import { createSlice } from "@reduxjs/toolkit";

export const defaultChannel = { 
  id: 1, 
  name: 'general', 
  removable: false 
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    currentChannel: defaultChannel,
    activeModal: '',
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
    setActiveModal(state, { payload}) {
      return {
        ...state, activeModal: payload,
      }
    }
  },
});

export const { setCurrentChannel, setChannels, setActiveModal } = appSlice.actions;

export default appSlice.reducer;