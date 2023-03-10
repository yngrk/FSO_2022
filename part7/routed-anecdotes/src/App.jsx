import React, { useState } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import useField from './hooks';

function Menu() {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
}

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Anecdote({ anecdote }) {
  const style = {
    content: {
      marginTop: '20px',
      marginBottom: 0,
    },
    paragraph: {
      margin: 0,
      padding: 0,
      marginBottom: '10px',
    },
    info: {
      margin: 0,
      padding: 0,
      marginBottom: '20px',
    },
  };
  return (
    <div>
      <h2 style={style.content}>"{anecdote.content}"</h2>
      <p style={style.paragraph}>
        {anecdote.author} - has {anecdote.votes} votes
      </p>
      <p style={style.info}>
        {' '}
        for more see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>

      <p>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div>
      Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
      See{' '}
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
      </a>{' '}
      for the source code.
    </div>
  );
}

function CreateNew({ addNew, onCreate }) {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate('/');
    onCreate(content.value);
  };

  const handleReset = () => {
    content.clear();
    author.clear();
    info.clear();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
}

function Notification({ message }) {
  if (message !== null) {
    return <div>{message}</div>;
  }
}

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    const anecdoteToAdd = anecdote;
    anecdoteToAdd.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdoteToAdd));
  };

  const handleCreate = (title) => {
    setNotification(`new anecdote [${title}] has been created.`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  const match = useMatch('/:id');
  const matchedAnecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/:id" element={<Anecdote anecdote={matchedAnecdote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} onCreate={handleCreate} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
