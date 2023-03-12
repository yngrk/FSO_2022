import React, { useState } from 'react';

function Blog({ blog, like, user, remove }) {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    like(updatedBlog);
  };

  const toggleView = () => {
    setView(!view);
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure?')) {
      remove(blog.id);
    }
  };

  const simpleView = () => (
    <div style={blogStyle}>
      {`${blog.title}, ${blog.author}`}{' '}
      <button type="button" onClick={toggleView}>
        view
      </button>
    </div>
  );

  const fullView = () => (
    <div style={blogStyle}>
      <div>
        {`${blog.title}, ${blog.author} `}
        <button type="button" onClick={toggleView}>
          close
        </button>
      </div>
      <div>
        {'url: '}
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {`likes: ${blog.likes} `}
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{`user: ${blog.user.name}`}</div>
      <div>
        {user && blog.user.username === user.username && (
          <button type="button" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="blog">
      {!view && simpleView()}
      {view && fullView()}
    </div>
  );
}

export default Blog;
