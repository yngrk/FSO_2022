import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

test('passes correct parameters to new blog event handler', async () => {
  const mockHandler = jest.fn();
  render(<NewBlogForm createNewBlog={mockHandler} />);

  const user = userEvent.setup();

  const submitBtn = screen.getByText('create');

  const inputTitle = screen.getByPlaceholderText('new blog title');
  const inputAuthor = screen.getByPlaceholderText('new blog author');
  const inputUrl = screen.getByPlaceholderText('new blog url');

  await user.type(inputTitle, 'test-title');
  await user.type(inputAuthor, 'test-author');
  await user.type(inputUrl, 'test-url');

  await user.click(submitBtn);

  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
  });
});
