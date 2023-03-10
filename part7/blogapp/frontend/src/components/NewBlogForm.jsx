import React, { useState } from 'react';

function NewBlogForm({ createNewBlog }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleNewBlog = (e) => {
    e.preventDefault();
    createNewBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">
            Title:
            <input placeholder="new blog title" id="title" name="Title" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input placeholder="new blog author" id="author" name="Author" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            Url:
            <input placeholder="new blog url" id="url" name="Url" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default NewBlogForm;
