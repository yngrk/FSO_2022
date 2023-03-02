import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ login }) {
  LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
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
}

export default LoginForm;
