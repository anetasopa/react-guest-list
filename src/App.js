import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import image from '../src/images/guest-list.png';
import styles from './App.module.scss';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [guestFilter, setGuestFilter] = useState(null);

  // const filteredGuests = guests;
  // console.log({ filteredGuests });

  // if (guestFilter) {
  //   const fn = (o) => o.name.includes(nameFilter);

  //   filteredGuests = filteredGuests.filter(fn);
  //   console.log({ filteredFiltered: filtered });
  // }

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
    setTimeout(() => {
      fetchQuests()
        .then()
        .catch((error) => console.log(error));
    }, 1000);
  }, [guests]);

  // add guest
  const addGuest = async () => {
    await fetch(`${baseUrl}/guests`, {
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
    await fetch(`${baseUrl}/guests/${guestId}`, {
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

    return await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: updatedGuest.attending }),
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

  return (
    <>
      <img className={styles.img} src={image} alt="img" />
      <div className={styles.container}>
        <h1>Guest List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {JSON.stringify(toggleAttending)}
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
              <br />
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
              <br />
              <button onClick={() => addGuest()}>Add guest</button>
            </form>
            <ul>
              {guests.map((guest) => (
                <div key={`user-${guest.id}`} data-test-id="guest">
                  <li>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faLeaf}
                      style={{ color: '#ffffff' }}
                    />
                    <label htmlFor={`attending-${guest.id}`}>Attending:</label>
                    <input
                      type="checkbox"
                      id={`attending-${guest.id}`}
                      aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                      checked={guest.attending}
                      onChange={() => toggleAttending(guest.id)}
                    />
                    <span>{`${guest.firstName} ${guest.lastName}`}</span>
                  </li>
                  <button
                    className={styles.buttonRemove}
                    aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                    onClick={() => deleteGuest(guest.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
