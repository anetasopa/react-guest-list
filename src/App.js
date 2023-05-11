import './App.module.scss';
import { useEffect, useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // state for the input data
  const [checkedGuest, setCheckedGuest] = useState(false);
  const [guests, setGuests] = useState({});

  const baseUrl = 'http://localhost:4000';
  const response = fetch(`${baseUrl}/guests/:id`);
  const guest = response.json();
  console.log({ guest });

  // trigger an action on first render
  // useEffect(() => {
  //   async function fetchQuests() {
  //     const response = await fetch(`${baseUrl}/guests/:id`);
  //     const guest = await response.json();
  //     console.log({ guest });

  //     setGuests(guest);
  //   }
  //   fetchQuests()
  //     .then()
  //     .catch((error) => console.log(error));
  // }, [guests]);

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
              aria-label="attending"
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
              aria-label="attending"
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
        {/* {guests.map((user) => {
          return (
            <div key={`user-${user.id}`}>
              <span>{user.name}</span>
              <span>{user.age}</span>
            </div>
          );
        })} */}
        <button onClick={async () => await setGuests()}>Get guest</button>
        {/* <button
          onClick={() => {
            // variable for the new quest
            const newPerson = { id: 3, name: 'Alex', age: 89 };

            // create copy of the current state
            const newQuest = [...guests];

            // update the copy created on step 1
            newQuest.push(newPerson);

            // set state to the copy of the old state
            setGuests(newQuest);
          }}
        >
          Add new quest
        </button>
        <button
          onClick={() => {
            // create a copy
            const newPerson = [...guests];

            // update the value
            newPerson.length = newPerson.length - 1;

            // set new state
            setGuests(newPerson);
          }}
        >
          Remove
        </button> */}
      </div>
    </>
  );
}
