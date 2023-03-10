const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const { initialBlogs, blogsInDb, nonExistingId } = require('./blog_test_helper');

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(initialBlogs);
  await User.deleteMany();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs unique id is "id"', async () => {
  const blogs = await blogsInDb();
  expect(blogs[0].id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newUser01 = {
    username: 'tempUser01',
    name: 'tempUserFullName',
    password: 'pass1',
  };

  const temp01 = await api
    .post('/api/users')
    .send(newUser01);

  const user01ForToken = {
    username: temp01.body.username,
    id: temp01.body.id,
  };

  const token = jwt.sign(user01ForToken, process.env.SECRET);

  const newBlog = {
    title: 'A new Blog',
    author: 'New Guy',
    url: 'http://www.new-blog.com/',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const currentBlogs = await blogsInDb();
  expect(currentBlogs.length).toBe(initialBlogs.length + 1);

  const titles = currentBlogs.map((b) => b.title);
  expect(titles).toContain('Awesome Blog');
});

test('if like property is missing, defaults to 0', async () => {
  const newUser01 = {
    username: 'tempUser01',
    name: 'tempUserFullName',
    password: 'pass1',
  };

  const temp01 = await api
    .post('/api/users')
    .send(newUser01);

  const user01ForToken = {
    username: temp01.body.username,
    id: temp01.body.id,
  };

  const token = jwt.sign(user01ForToken, process.env.SECRET);

  const newBlog = {
    title: 'A new Blog',
    author: 'New Guy',
    url: 'http://www.new-blog.com/',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const currentBlogs = await blogsInDb();
  currentBlogs.forEach((blog) => {
    expect(blog.likes).toBeDefined();
  });
});

test('missing title reponds with status 400', async () => {
  const blogMissingTitle = {
    author: 'New Guy',
    url: 'http://www.new-blog.com/',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(blogMissingTitle)
    .expect(400);

  const currentBlogs = await blogsInDb();

  expect(currentBlogs).toHaveLength(initialBlogs.length);
});

test('missing url reponds with status 400', async () => {
  const blogMissingUrl = {
    title: 'Blog with missing URL',
    author: 'New Guy',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(blogMissingUrl)
    .expect(400);

  const currentBlogs = await blogsInDb();

  expect(currentBlogs).toHaveLength(initialBlogs.length);
});

test('deletion succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await blogsInDb();

  const newUser01 = {
    username: 'tempUser01',
    name: 'tempUserFullName',
    password: 'pass1',
  };

  const temp01 = await api
    .post('/api/users')
    .send(newUser01);

  const user01ForToken = {
    username: temp01.body.username,
    id: temp01.body.id,
  };

  const token = jwt.sign(user01ForToken, process.env.SECRET);

  // make new Blog as newUser
  const newBlog = {
    title: 'A new Blog',
    author: 'New Guy',
    url: 'http://www.new-blog.com/',
  };

  const tempBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog);

  await api
    .delete(`/api/blogs/${tempBlog.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd.length).toBe(blogsAtStart.length);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(newBlog.title);
});

test('deletion fails with unknown id', async () => {
  const unknownId = await nonExistingId();

  const newUser01 = {
    username: 'tempUser01',
    name: 'tempUserFullName',
    password: 'pass1',
  };

  const temp01 = await api
    .post('/api/users')
    .send(newUser01);

  const user01ForToken = {
    username: temp01.body.username,
    id: temp01.body.id,
  };

  const token = jwt.sign(user01ForToken, process.env.SECRET);

  await api
    .delete(`/api/blogs/${unknownId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404);
});

test('deletion fails when not authorized', async () => {
  const blogsAtStart = await blogsInDb();

  const newUser01 = {
    username: 'tempUser01',
    name: 'tempUserFullName',
    password: 'pass1',
  };

  const temp01 = await api
    .post('/api/users')
    .send(newUser01);

  const user01ForToken = {
    username: temp01.body.username,
    id: temp01.body.id,
  };

  const tokenUser1 = jwt.sign(user01ForToken, process.env.SECRET);

  const newUser02 = {
    username: 'tempUser02',
    name: 'tempUserFullName',
    password: 'pass2',
  };

  const temp02 = await api
    .post('/api/users')
    .send(newUser02);

  const user02ForToken = {
    username: temp02.body.username,
    id: temp02.body.id,
  };

  const tokenUser2 = jwt.sign(user02ForToken, process.env.SECRET);

  // make new Blog (user1)
  const newBlog = {
    title: 'A new Blog',
    author: 'New Guy',
    url: 'http://www.new-blog.com/',
  };

  const tempBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${tokenUser1}`)
    .send(newBlog);

  // delete Blog as user2
  await api
    .delete(`/api/blogs/${tempBlog.body.id}`)
    .set('Authorization', `Bearer ${tokenUser2}`)
    .expect(401);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1);
});

test('updating succeeds with valid values', async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = { ...blogsAtStart[0] };
  blogToUpdate.likes = 999;

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await blogsInDb();
  const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
  expect(updatedBlog.likes).toBe(999);
});

test('updating fails with unknown id', async () => {
  const unknownId = await nonExistingId();

  await api
    .put(`/api/blogs/${unknownId}`)
    .expect(404);
});

afterAll(() => {
  mongoose.connection.close();
});
