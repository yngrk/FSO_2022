import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const userlistSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    setUserlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserlist } = userlistSlice.actions;

export const fetchAndSetUserlist = () => async (dispatch) => {
  const response = await usersService.getAll();
  dispatch(setUserlist(response));
};

export default userlistSlice.reducer;
