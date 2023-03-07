import axios from 'axios';

const baseUrl = ('http://localhost:3001/anecdotes');

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newObj = { content, important: false, votes: 0 };
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

const voteAnecdote = async (id) => {
  const anecdotes = await getAll();
  const objToChange = anecdotes.find((anecdote) => anecdote.id === id);
  const changedObj = { ...objToChange, votes: objToChange.votes + 1 };
  const response = await axios.put(`${baseUrl}/${changedObj.id}`, changedObj);
  return response.data;
};

export default { getAll, createNew, voteAnecdote };
