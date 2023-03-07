import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteAnecdote(state, action) {
      return [...state].map((anecdote) => {
        if (action.payload === anecdote.id) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
    },
    setAnecdote(state, action) {
      return [...action.payload];
    },
  },
});

export const {
  appendAnecdote,
  voteAnecdote,
  setAnecdote,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdote(anecdotes));
};

export const createNewAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const updateVoteAnecdote = (id) => async (dispatch) => {
  const votedAnecdote = await anecdoteService.voteAnecdote(id);
  dispatch(voteAnecdote(votedAnecdote.id));
};

export default anecdoteSlice.reducer;
