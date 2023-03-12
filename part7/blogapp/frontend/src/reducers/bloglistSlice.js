import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const bloglistSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    setBloglist: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBloglist } = bloglistSlice.actions;

export const fetchAndSetBloglist = () => async (dispatch) => {
  const response = await blogService.getAll();
  dispatch(setBloglist(response));
};

export const updateAndSetBloglist = (updatedBlog) => async (dispatch) => {
  await blogService.update(updatedBlog);
  dispatch(fetchAndSetBloglist());
};

export const removeAndSetBloglist = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch(fetchAndSetBloglist());
};

export const createAndSetBloglist = (blog) => async (dispatch) => {
  await blogService.create(blog);
  dispatch(fetchAndSetBloglist());
};

export default bloglistSlice.reducer;
