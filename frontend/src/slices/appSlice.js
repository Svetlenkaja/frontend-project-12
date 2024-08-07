import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeModal: '',
    modalChannel: null,
    scrollPosition: '',
  },
  reducers: {
    setActiveModal(state, { payload }) {
      return {
        ...state, activeModal: payload,
      };
    },
    setModalChannel(state, { payload }) {
      return {
        ...state, modalChannel: payload,
      };
    },
    setScrollPosition(state, { payload }) {
      return {
        ...state, scrollPosition: payload,
      };
    },
  },
});

export const {
  setActiveModal,
  setModalChannel,
  setScrollPosition,
} = appSlice.actions;

export default appSlice.reducer;
