import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const addAnecdote = (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    return Promise.reject(new Error('too short anecdote, must have length 5 or more'));
  }

  const addedAnecdote = axios.post(baseUrl, newAnecdote).then((res) => res.data);
  return addedAnecdote;
};

export const voteAnecdote = (anecdoteToUpdate) => {
  const updatedAnecdote = axios.put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate).then((res) => res.data);
  return updatedAnecdote;
};
