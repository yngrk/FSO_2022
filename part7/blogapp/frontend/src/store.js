import { configureStore } from '@reduxjs/toolkit';
import bloglistSlice from './reducers/bloglistSlice';
import notificationSlice from './reducers/notificationSlice';
import userSlice from './reducers/userSlice';

export default configureStore({
  reducer: {
    notification: notificationSlice,
    bloglist: bloglistSlice,
    user: userSlice,
  },
});
