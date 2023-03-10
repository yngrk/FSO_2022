import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import ErrorMessage from './components/ErrorMessage';
import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: null });

  useEffect(() => {
    blogService.getAll()
      .then((fetchedBlogs) => setBlogs(fetchedBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await loginService.login({
        username, password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData));

      blogService.setToken(userData.token);

      setUser(userData);

      setMessage({ text: 'Login successful', type: 'info' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    } catch (exception) {
      setMessage({ text: 'wrong username or password', type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    setMessage({ text: 'Logout successful', type: 'info' });
    setTimeout(() => {
      setMessage({ text: '', type: null });
    }, 5000);
  };

  const handleNewBlog = async (blog) => {
    try {
      await blogService.create(blog);

      // get blogs from server again to populate userdata
      blogService.getAll()
        .then((fetchedBlogs) => setBlogs(fetchedBlogs));

      setMessage({ text: `New Blog was added: ${blog.title}`, type: 'info' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    } catch (exception) {
      setMessage({ text: exception.message, type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    }
  };

  const handleLike = async (updateBlog) => {
    try {
      await blogService.update(updateBlog);
      await blogService.getAll()
        .then((fetchedBlogs) => setBlogs(fetchedBlogs));
    } catch (exception) {
      setMessage({ text: exception.message, type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    }
  };

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id);
      await blogService.getAll()
        .then((fetchedBlogs) => setBlogs(fetchedBlogs));
    } catch (exception) {
      setMessage({ text: exception.message, type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: null });
      }, 5000);
    }
  };

  const loginForm = () => (
    <LoginForm login={handleLogin} />
  );

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={handleLike}
          remove={handleRemove}
          user={user}
        />
      ))}
    </>
  );

  const newBlogForm = () => (
    <NewBlogForm createNewBlog={handleNewBlog} />
  );

  return (
    <div>
      <ErrorMessage message={message} />
      {!user && (
      <Togglable buttonLabel="log in">
        {loginForm()}
      </Togglable>
      )}
      {user && (
      <div>
        <p>
          {`${user.username} logged in`}
          <button type="button" onClick={handleLogout}>Logout</button>
        </p>
        <Togglable buttonLabel="new blog">
          {newBlogForm()}
        </Togglable>
      </div>
      )}
      <div>{blogForm()}</div>
    </div>
  );
}

export default App;
