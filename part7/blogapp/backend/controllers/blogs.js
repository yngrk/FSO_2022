const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.status(200).json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { body } = req;
  const userId = req.user;

  if (!body.title || !body.url || !userId) { res.status(400).end(); }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: userId,
  });

  const savedBlog = await blog.save();
  const user = await User.findById(userId);

  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  return res.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = req.body;

  const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
  if (blog) {
    res.status(200).json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { user } = req;
  const blog = await Blog.findById(req.params.id);

  if (!blog || !user) { return res.status(404).end(); }
  if (user.toString() !== blog.user.toString()) {
    return res.status(401).json({ error: 'not authorized' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = blogsRouter;
