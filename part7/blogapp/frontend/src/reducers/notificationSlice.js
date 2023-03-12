import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    type: null,
  },
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => {
      return {
        text: '',
        type: null,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (text, type) => (dispatch) => {
  dispatch(setNotification({ text, type }));
  setTimeout(() => {
    dispatch(clearNotification());
  }, 3000);
};

export default notificationSlice.reducer;
