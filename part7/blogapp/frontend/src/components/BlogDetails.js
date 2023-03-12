import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchAndSetBloglist } from '../reducers/bloglistSlice';
import blogService from '../services/blogs';

const BlogDetails = ({ blog, like, remove, user }) => {
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

  const handleRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure?')) {
      remove(blog.id);
    }
  };

  if (!blog) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <div style={blogStyle}>
        <h2>{`${blog.title}, ${blog.author} `}</h2>
        <div>
          {'url: '}
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {`likes: ${blog.likes} `}
          <Button type="button" onClick={handleLike}>
            like
          </Button>
        </div>
        <div>{`user: ${blog.user.name}`}</div>
        <div>
          {user && blog.user.username === user.username && (
            <Button type="button" onClick={handleRemove}>
              remove
            </Button>
          )}
        </div>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const addComment = async (e) => {
    e.preventDefault();
    const blogId = blog.id;
    const content = e.target.elements[0].value;
    await blogService.addComment(content, blogId);
    e.target.elements[0].value = '';
    dispatch(fetchAndSetBloglist());
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <div>new comment:</div>
        <Form onSubmit={addComment}>
          <div className="d-flex">
            <FormControl type="text"></FormControl>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;
