import React from 'react';

function Blog({ blog }) {
  return (
    <div>
      {blog.title}
      {' '}
      {blog.author}
    </div>
  );
}

export default Blog;
