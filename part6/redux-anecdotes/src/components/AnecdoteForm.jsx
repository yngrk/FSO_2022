import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createNewAnecdote(content));

    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';

    dispatch(showNotification(`New Anecdote added: [${content}]`, 3));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
