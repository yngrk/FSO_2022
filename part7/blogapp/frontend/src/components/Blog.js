import React from 'react';
import { Link } from 'react-router-dom';

function Blog({ blog, like, user, remove }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title}, ${blog.author}`}</Link>
    </div>
  );
}

export default Blog;
