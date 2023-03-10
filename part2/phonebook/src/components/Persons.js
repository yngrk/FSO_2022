import Button from "./Button";

const Persons = ({ persons, filter, onDelete }) => {
  return (
    <>
      {persons.map((person) => {
        let included;
        if (filter.length === 0) included = true;
        else {
          included = person.name.toLowerCase().includes(filter.toLowerCase());
        }

        if (included) {
          return (
            <p key={person.id}>
              <Person person={person} />{" "}
              <Button text="delete" onClick={() => onDelete(person.id)} />
            </p>
          );
        } else return null;
      })}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
    </>
  );
};

export default Persons;
