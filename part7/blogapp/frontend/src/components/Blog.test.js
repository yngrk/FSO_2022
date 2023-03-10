import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders blogs title and author but not url or likes', () => {
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
  };

  render(<Blog blog={blog} />);

  expect(screen.queryByText('test-title, test-author')).toBeTruthy();
  expect(screen.queryByText('likes: 0')).toBeFalsy();
  expect(screen.queryByText('url: test-url')).toBeFalsy();
});

test('renders all blog details when expanded', async () => {
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: { name: 'test-user' },
  };

  render(<Blog blog={blog} />);

  const button = screen.getByText('view');
  const user = userEvent.setup();
  await user.click(button);

  expect(screen.queryByText('test-title, test-author')).toBeTruthy();
  expect(screen.queryByText(/likes/)).toBeTruthy();
  expect(screen.queryByText(/test-url/)).toBeTruthy();
});

test('when like button clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: { name: 'test-user' },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} like={mockHandler} />);

  const viewButton = screen.getByText('view');
  const user = userEvent.setup();
  await user.click(viewButton);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
