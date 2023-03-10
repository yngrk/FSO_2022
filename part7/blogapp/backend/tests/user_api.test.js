const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);
const { usersInDb } = require('./blog_test_helper');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'user01',
      name: 'Full Name',
      password: 'pass',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'rootpass',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe('username and password validation', () => {
  beforeEach(async () => {
    User.deleteMany({});
  });

  test('when username only 2 characters long, fails with 400', async () => {
    const usersAtStart = usersInDb();

    const newUser = {
      username: 'ge',
      name: 'name',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('when password only 2 characters long, fails with 400', async () => {
    const usersAtStart = usersInDb();

    const newUser = {
      username: 'gedfdaf',
      name: 'name',
      password: 'pa',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
