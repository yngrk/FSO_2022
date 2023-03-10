const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((total, current) => total + current.likes, 0);

const favouriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
  return blogs.length > 0
    ? {
      title: sorted[0].title,
      author: sorted[0].author,
      likes: sorted[0].likes,
    }
    : undefined;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const count = _.countBy(blogs, 'author');
  return _.maxBy(Object.keys(count), (author) => count[author]);
};

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author');
  const mapped = _.map(grouped, (likes, author) => ({ author, likes }));
  const reduced = _.map(mapped, (entry) => {
    const likesCount = _.reduce(entry.likes, (sum, { likes }) => sum + likes, 0);
    return {
      author: entry.author,
      likes: likesCount,
    };
  });
  return _.maxBy(reduced, 'likes');
};
mostLikes([]);

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
