import React from 'react';
import { counterStore } from './reducer';

function App() {
  const handleGood = () => counterStore.dispatch({
    type: 'GOOD',
  });
  const handleOk = () => counterStore.dispatch({
    type: 'OK',
  });
  const handleBad = () => counterStore.dispatch({
    type: 'BAD',
  });
  const handleReset = () => counterStore.dispatch({
    type: 'ZERO',
  });

  return (
    <div>
      <div>
        <button type="button" onClick={handleGood}>good</button>
        <button type="button" onClick={handleOk}>ok</button>
        <button type="button" onClick={handleBad}>bad</button>
        <button type="button" onClick={handleReset}>reset</button>
      </div>
      <div>
        <p>{`good: ${counterStore.getState().good}`}</p>
        <p>{`ok: ${counterStore.getState().ok}`}</p>
        <p>{`bad: ${counterStore.getState().bad}`}</p>
      </div>
    </div>
  );
}

export default App;
