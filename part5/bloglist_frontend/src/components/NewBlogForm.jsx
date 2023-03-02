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
}

export default NewBlogForm;
