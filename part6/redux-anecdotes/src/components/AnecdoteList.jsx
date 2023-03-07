import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVoteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdoteList = useSelector((state) => {
    const sorted = [...state.anecdotes].sort((a, b) => (a.votes > b.votes ? -1 : 1));
    const filtered = [...sorted].filter((anecdote) => {
      const lowerContent = anecdote.content.toLowerCase();
      return lowerContent.includes(state.filter.toLowerCase());
    });
    return filtered;
  });
  const dispatch = useDispatch();

  const vote = async (id, content) => {
    dispatch(updateVoteAnecdote(id));
    dispatch(showNotification(`You voted for [${content}]`, 3));
  };

  return (
    <div>
      {anecdoteList.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={vote}
        />
      ))}
    </div>
  );
}

function Anecdote({ anecdote, vote }) {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        {`has ${anecdote.votes}`}
        <button type="button" onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  );
}

export default AnecdoteList;
