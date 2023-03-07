import React, { useReducer } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import notificationReducer from './NotificationContext';
import { getAnecdotes, voteAnecdote } from './service/requests';

function App() {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);
  const queryClient = useQueryClient();
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');

      const updatedAnecdotes = anecdotes.map((anecdote) => {
        if (anecdote.id === updatedAnecdote.id) {
          return updatedAnecdote;
        }
        return anecdote;
      });

      queryClient.setQueryData('anecdotes', updatedAnecdotes);

      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `You voted for [${updatedAnecdote.content}]` });

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery('anecdotes', getAnecdotes);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm notificationDispatch={notificationDispatch} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has
            {anecdote.votes}
            <button type="button" onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
