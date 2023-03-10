const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'This is a blog',
    author: 'Some Guy',
    url: 'http://www.some-dudes-blog.com/',
    likes: 0,
  },
  {
    title: 'Awesome Blog',
    author: 'Awesome Guy',
    url: 'http://www.awesome-blog.com/',
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'A', author: 'B', url: 'C', likes: 0,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs, blogsInDb, nonExistingId, usersInDb,
};
