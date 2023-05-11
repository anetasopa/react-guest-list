import './App.module.scss';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // trigger an action on first render
  // get data
  useEffect(() => {
    async function fetchQuests() {
      const response = await fetch(`${baseUrl}/guests/`);
      const guest = await response.json();
      console.log({ guest });

      setGuests(guest);
      setIsLoading(false);
    }
    fetchQuests()
      .then()
      .catch((error) => console.log(error));
  }, [guests]);

  // add guest
  const addGuest = async () => {
    fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        // default attending
        attending: false,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // clear the value in the inputs
        setFirstName('');
        setLastName('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // delete guest
  const deleteGuest = async (guestId) => {
    fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  // update attending
  const toggleAttending = async (guestId) => {
    const guestToUpdate = guests.find((guest) => guest.id === guestId);
    const updatedGuest = {
      ...guestToUpdate,
      attending: !guestToUpdate.attending,
    };

    return fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    })
      .then((data) => {
        console.log(data); // do something with the data if needed
        return updatedGuest;
      })
      .catch((error) => {
        console.error('Error:', error);
        return guestToUpdate;
      });
  };

  useEffect(() => {
    if (guests.length > 0) {
      setIsLoading(false);
    }
  }),
    [guests];

  return (
    <div>
      <h1>Guest List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <br />
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
            <br />
            <button onClick={() => addGuest()}>Add guest</button>
          </form>
          <ul>
            {guests.map((guest) => (
              // eslint-disable-next-line react/jsx-key
              <>
                <li key={guest.id} data-test-id="guest">
                  <label htmlFor={`attending-${guest.id}`}>Attending:</label>
                  <input
                    type="checkbox"
                    id={`attending-${guest.id}`}
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    checked={guest.attending}
                    onChange={() => toggleAttending(guest.id)}
                  />
                  {`${guest.firstName} ${guest.lastName}`}
                </li>
                <button
                  aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                  onClick={() => deleteGuest(guest.id)}
                >
                  Remove
                </button>
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
