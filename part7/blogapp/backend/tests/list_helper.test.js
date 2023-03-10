const {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
} = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy return one', () => {
  expect(dummy([])).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes on that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(listWithManyBlogs)).toBe(36);
  });
});

describe('favourite blog', () => {
  test('when list is empty to return undefined', () => {
    expect(favouriteBlog([])).toBe(undefined);
  });

  test('when list has only one blog, equals that blog', () => {
    expect(favouriteBlog(listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of a bigger list equals the correct blog', () => {
    expect(favouriteBlog(listWithManyBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('author with most blogs', () => {
  test('when list is empty, equals undefined', () => {
    expect(mostBlogs([])).toBe(undefined);
  });

  test('when list has only one blog, equals the author of that blog', () => {
    expect(mostBlogs(listWithOneBlog)).toBe('Edsger W. Dijkstra');
  });

  test('when list has many blogs, equals the correct author', () => {
    expect(mostBlogs(listWithManyBlogs)).toBe('Robert C. Martin');
  });
});

describe('author with most likes', () => {
  test('when list is empty, equals undefined', () => {
    expect(mostLikes([])).toBe(undefined);
  });

  test('when list has only one blog, equals that blogs author and likes', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('when list has many blogs, equals the correct author and the correct sum', () => {
    expect(mostLikes(listWithManyBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
