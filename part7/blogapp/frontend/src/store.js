import { configureStore } from '@reduxjs/toolkit';
import bloglistSlice from './reducers/bloglistSlice';
import notificationSlice from './reducers/notificationSlice';
import userlistSlice from './reducers/userlistSlice';
import userSlice from './reducers/userSlice';

export default configureStore({
  reducer: {
    notification: notificationSlice,
    bloglist: bloglistSlice,
    userlist: userlistSlice,
    user: userSlice,
  },
});
