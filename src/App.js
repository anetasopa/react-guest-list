import './App.module.scss';
import { useState } from 'react';

const people = [
  { id: 1, name: 'Ala', age: 34 },
  { id: 2, name: 'Kris', age: 14 },
];

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // state for the input data
  const [checkedGuest, setCheckedGuest] = useState(false);
  const [guests, setGuests] = useState(people);

  return (
    <>
      <div data-test-id="guest">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            First name
            <input
              // use the current value of the state as the checked property of the input
              placeholder="First name"
              onChange={(e) => setFirstName(e.currentTarget.value)}
              value={firstName}
            />
            <input
              checked={checkedGuest}
              type="checkbox"
              // update the state value with the event.currentTarget.checked
              onChange={(e) => {
                setCheckedGuest(e.currentTarget.checked);
              }}
            />
          </label>
          <label>
            Last name
            <input
              placeholder="Last name"
              onChange={(e) => setLastName(e.currentTarget.value)}
              value={lastName}
            />
            <input
              checked={checkedGuest}
              type="checkbox"
              // update the state value with the event.currentTarget.checked
              onChange={(e) => {
                setCheckedGuest(e.currentTarget.checked);
              }}
            />
          </label>
          <button>Return</button>
        </form>
      </div>
      <div>
        {guests.map((user) => {
          return (
            <div key={`user-${user.id}`}>
              <span>{user.name}</span>
              <span>{user.age}</span>
            </div>
          );
        })}
        <button
          onClick={() => {
            // variable for the new quest
            const newPerson = { id: 3, name: 'Alex', age: 89 };

            // create copy of the current state
            const newQuest = [...people];

            // update the copy created on step 1
            newQuest.push(newPerson);
            console.log(people);

            // set state to the copy of the old state
            setGuests(newQuest);
          }}
        >
          Add new quest
        </button>
      </div>
    </>
  );
}
