import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import ErrorMessage from './components/ErrorMessage';
import blogService from './services/blogs';
import loginService from './services/login';

import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: null });

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginService.login({
        username, password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData));

      blogService.setToken(userData.token);

      setUser(userData);
      setUsername('');
      setPassword('');

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

  const handleNewBlog = async (e) => {
    e.preventDefault();

    try {
      const postedBlog = await blogService.create(newBlog);
      setBlogs([...blogs, postedBlog]);
      setNewBlog({ title: '', author: '', url: '' });
      setMessage({ text: `New Blog was added: ${newBlog.title}`, type: 'info' });
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

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            username
            <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input id="password" type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </>
  );

  const newBlogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">
            Title:
            <input id="title" name="Title" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input id="author" name="Author" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            Url:
            <input id="url" name="Url" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );

  return (
    <div>
      <ErrorMessage message={message} />
      {!user && loginForm()}
      {user && (
      <div>
        <p>
          {`${user.username} logged in`}
          <button type="button" onClick={handleLogout}>Logout</button>
        </p>
        <div>{newBlogForm()}</div>
        <div>{blogForm()}</div>
      </div>
      )}
    </div>
  );
}

export default App;
