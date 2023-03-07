import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return null;
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const showNotification = (notification, time) => (dispatch) => {
  const timeInSeconds = time * 1000;
  dispatch(setNotification(notification));
  setTimeout(() => {
    dispatch(resetNotification());
  }, timeInSeconds);
};

export default notificationSlice.reducer;
