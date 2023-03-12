import React, { useEffect } from 'react';
import Blog from './components/Blog';
import ErrorMessage from './components/ErrorMessage';
import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationSlice';
import {
  createAndSetBloglist,
  fetchAndSetBloglist,
  removeAndSetBloglist,
  updateAndSetBloglist,
} from './reducers/bloglistSlice';
import { setUser } from './reducers/userSlice';
import { Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import { fetchAndSetUserlist } from './reducers/userlistSlice';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const bloglist = useSelector((state) => state.bloglist);
  const userlist = useSelector((state) => state.userlist);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAndSetBloglist());
    dispatch(fetchAndSetUserlist());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userData)
      );

      blogService.setToken(userData.token);

      dispatch(setUser(userData));

      dispatch(showNotification('login successful', 'info'));
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    dispatch(setUser(null));
    dispatch(showNotification('logout successful', 'info'));
  };

  const handleNewBlog = async (blog) => {
    try {
      dispatch(createAndSetBloglist(blog));
      dispatch(showNotification(`New Blog was added: ${blog.title}`, 'info'));
    } catch (exception) {
      dispatch(showNotification(exception.message, 'error'));
    }
  };

  const handleLike = async (updatedBlog) => {
    try {
      dispatch(updateAndSetBloglist(updatedBlog));
    } catch (exception) {
      dispatch(showNotification(exception.message, 'error'));
    }
  };

  const handleRemove = async (id) => {
    try {
      dispatch(removeAndSetBloglist(id));
    } catch (exception) {
      dispatch(showNotification(exception.message, 'error'));
    }
  };

  const showMainFrame = () => {
    return (
      <div>
        {user && (
          <Togglable buttonLabel="create new blog">
            <NewBlogForm createNewBlog={handleNewBlog} />
          </Togglable>
        )}

        <h2>blogs</h2>
        {[...bloglist]
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={handleLike}
              remove={handleRemove}
              user={user}
            />
          ))}
      </div>
    );
  };

  return (
    <div>
      <ErrorMessage message={notification} />
      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm login={handleLogin} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            {`${user.username} logged in `}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </p>
        </div>
      )}
      <Routes>
        <Route path="/" element={showMainFrame()} />
        <Route path="/users" element={<Users userlist={userlist} />} />
      </Routes>
    </div>
  );
}

export default App;
