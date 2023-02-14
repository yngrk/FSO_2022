import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const mostVotesIndex = (() => {
    let idx = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] >= votes[idx]) idx = i;
    }
    return idx;
  })();

  const selectRandom = () => {
    const max = anecdotes.length;
    let rand;

    do {
      rand = Math.floor(Math.random() * max);
    } while (rand === selected);

    setSelected(rand);
  };

  const incrementVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button onClick={incrementVotes} text="vote" />
      <Button onClick={selectRandom} text="next anecdote" />
      <AnecdoteWithMostVotes
        anecdotes={anecdotes}
        votes={votes}
        mostVotesIndex={mostVotesIndex}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const AnecdoteOfTheDay = ({ anecdotes, votes, selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  );
};

const AnecdoteWithMostVotes = ({ anecdotes, votes, mostVotesIndex }) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {votes[mostVotesIndex]} votes</p>
    </>
  );
};

export default App;
