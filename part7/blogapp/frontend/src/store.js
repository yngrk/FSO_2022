import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './reducers/notificationSlice';

export default configureStore({
  reducer: {
    notification: notificationSlice,
  },
});
