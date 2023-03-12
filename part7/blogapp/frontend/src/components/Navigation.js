import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="nav">
      <div>
        <Link to="/">blogs</Link>
      </div>
      <div>
        <Link to="/users">users</Link>
      </div>
    </div>
  );
};

export default Navigation;
