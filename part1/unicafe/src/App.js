import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleBtnGood = () => setGood(good + 1);
  const handleBtnNeutral = () => setNeutral(neutral + 1);
  const handleBtnBad = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = (good / all) * 100 + " %";

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleBtnGood} text="good" />
      <Button onClick={handleBtnNeutral} text="neutral" />
      <Button onClick={handleBtnBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        pos={positive}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, avg, pos }) => {
  const printStats = () => {
    if (all > 0)
      return (
        <table>
          <tbody>
            <StatisticsLine text="good" val={good} />
            <StatisticsLine text="neutral" val={neutral} />
            <StatisticsLine text="bad" val={bad} />
            <StatisticsLine text="all" val={all} />
            <StatisticsLine text="avg" val={avg} />
            <StatisticsLine text="positive" val={pos} />
          </tbody>
        </table>
      );
    else return <p>No feedback given</p>;
  };

  return (
    <div>
      <h2>statistics</h2>
      {printStats()}
    </div>
  );
};

const StatisticsLine = ({ text, val }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{val}</td>
    </tr>
  );
};

export default App;
