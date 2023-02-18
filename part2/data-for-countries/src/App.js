import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import Message from "./components/Message";

const App = () => {
  // state: list of countries and its data
  const [countries, setCountries] = useState([]);

  // state: onChange listener for countries filter
  const [filterInput, setFilterInput] = useState("");

  // state: active status on Country components
  const [activeAll, setActiveAll] = useState(false);

  // state: notification message
  const [showMessage, setShowMessage] = useState(false);

  // update state filterInput
  const handlerFilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  // effect: fetch data from server
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  // show message based on limit
  useEffect(() => {
    const filteredCountries = countries.filter((c) =>
      c.name.official.toLowerCase().includes(filterInput.toLowerCase())
    );
    if (filteredCountries.length > 10 && filterInput.length > 0)
      setShowMessage(true);
    else setShowMessage(false);
  }, [countries, filterInput]);

  // collapse all Country components
  const collapseAll = () => {
    setActiveAll(true);
    setTimeout(() => setActiveAll(false), 0);
  };

  // expand all Country components
  const expandAll = () => {
    setActiveAll(false);
    setTimeout(() => setActiveAll(true), 0);
  };

  const showCountries = () => {
    const filteredCountries = countries.filter((c) =>
      c.name.official.toLowerCase().includes(filterInput.toLowerCase())
    );

    if (countries.length <= 0 || filteredCountries.length <= 0) return null;

    if (filteredCountries.length === 1) {
      return (
        <>
          <Country key={0} data={filteredCountries[0]} active={true} />
        </>
      );
    }

    if (filteredCountries.length <= 10) {
      return (
        <>
          {filteredCountries
            .sort((a, b) =>
              a.name.official
                .toLowerCase()
                .localeCompare(b.name.official.toLowerCase())
            )
            .map((country, idx) => (
              <Country key={idx} data={country} active={activeAll} />
            ))}
        </>
      );
    }
  };

  return (
    <div id="country-info">
      <label htmlFor="countries">Find countries: </label>
      <input id="countries" onChange={handlerFilterInput} value={filterInput} />

      <Message show={showMessage} />

      <div className="control">
        <button onClick={collapseAll}>collapse all</button>
        <button onClick={expandAll}>expand all</button>
      </div>

      {showCountries()}
    </div>
  );
};

export default App;
