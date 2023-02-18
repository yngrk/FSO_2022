import { useEffect, useState } from "react";
import Input from "./components/Input";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Button from "./components/Button";
import Notification from "./components/Notification";
import * as pbService from "./service/pbEntry";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: "notification",
  });

  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

  // fetch persons from json-server
  useEffect(() => {
    pbService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addEntry = (e) => {
    e.preventDefault();

    // no value
    if (newName === "") return;

    // already in persons
    if (persons.some((obj) => obj.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Would you like to update old number with a new one?`
        )
      ) {
        const id = persons.filter((p) => p.name === newName)[0].id;
        changeNumber(id, newNumber);
        return;
      } else return;
    }

    // make new person object and post to server
    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    pbService.add(newPersonObj).then((addedObj) => {
      setPersons([...persons, addedObj]);
      setNewName("");
      setNewNumber("");
    });

    // show notification message for 5 seconds
    setNotificationMessage({
      message: `${newName} added`,
      type: "notification",
    });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: "notification" });
    }, 5000);
  };

  const deleteEntry = (id) => {
    const obj = persons.filter((p) => p.id === id)[0];
    if (window.confirm(`Obliterate ${obj.name}?`))
      pbService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setNotificationMessage({
            message: `Error ${obj.name} has already been removed.`,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: "notification" });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
  };

  const changeNumber = (id, newNumber) => {
    const currentPerson = persons.find((p) => p.id === id);
    const changedPerson = { ...currentPerson, number: newNumber };
    pbService.update(id, changedPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <Filter value={filter} onChange={handleFilterChange} />
      <form>
        <h2>Add New</h2>
        <Input text="name" value={newName} onChange={handleNewNameChange} />
        <Input
          text="number"
          value={newNumber}
          onChange={handleNewNumberChange}
        />
        <Button text="add" onClick={addEntry} />
      </form>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={deleteEntry} />
    </div>
  );
};

export default App;
