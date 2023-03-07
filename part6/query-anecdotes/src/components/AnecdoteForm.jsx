import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addAnecdote } from '../service/requests';

function AnecdoteForm({ notificationDispatch }) {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `New Anecdote [${newAnecdote.content}] has been created` });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.message });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, important: false });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
