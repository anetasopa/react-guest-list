import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import image from './images/image3.png';

const baseUrl = 'https://c2307a9a-e779-4389-8c23-48c4e3611827.id.repl.co';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isAttending, setIsAttending] = useState('please select');

  useEffect(() => {
    async function fetchQuests() {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/guests/`);
      const filterFrom = await response.json();

      if (isAttending === 'attending') {
        const filteredListAttending = filterFrom.filter(
          (guest) => guest.attending === true,
        );
        console.log({ filteredListAttending });
        setGuests(filteredListAttending);
      } else if (isAttending === 'no attending') {
        const filteredListNoAttending = filterFrom.filter(
          (guest) => guest.attending === false,
        );
        console.log({ filteredListNoAttending });
        setGuests(filteredListNoAttending);
      } else {
        setGuests(filterFrom);
      }
    }
    fetchQuests().catch((error) => console.log(error));
  }, [isAttending]);

  useEffect(() => {
    setIsLoading(false);
  }, [guests]);

  // trigger an action on first render
  // get data
  useEffect(() => {
    async function fetchQuests() {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/guests/`);
      const guest = await response.json();

      // await new Promise((resolve) => setTimeout(resolve, 1000));

      setGuests([...guest]);
    }
    fetchQuests().catch((error) => console.log(error));
  }, []);

  // add guest
  const addGuest = async () => {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });

    if (firstName === '' || lastName === '') {
      return;
    }

    const createdGuest = await response.json();
    const newGuestList = [...guests, createdGuest];

    setGuests(newGuestList);
    setFirstName('');
    setLastName('');
  };

  // delete guest
  const deleteGuest = async (para) => {
    const response = await fetch(`${baseUrl}/guests/${para}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuestList);
  };

  // delete all guest
  const removeAllGuest = async () => {
    setIsLoading(true);
    for (const guest of guests) {
      await deleteGuest(guest.id);
    }
    setGuests([]);
  };

  // update attending
  const toggleAttending = async (para) => {
    const index = guests.findIndex((guest) => guest.id === para);
    const response = await fetch(`${baseUrl}/guests/${para}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !guests[index].attending }),
    });
    const updatedGuest = await response.json();
    const newUpdatedGuest = [...guests];
    newUpdatedGuest[index].attending = updatedGuest.attending;
    setGuests(newUpdatedGuest);
  };

  const renderList = () => {
    return guests.map((guest) => (
      <div key={`user-${guest.id}`} data-test-id="guest">
        <div className={styles.checkboxWrapper}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              aria-label={`${guest.firstName} ${guest.lastName} attending status`}
              checked={guest.attending}
              onChange={() => toggleAttending(guest.id)}
            />
            <span className={styles.checkboxIcon} />
          </label>
        </div>
        <span>{`${guest.firstName} ${guest.lastName}`}</span>
        <button
          className={styles.buttonRemove}
          aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
          onClick={() => deleteGuest(guest.id)}
        >
          <FontAwesomeIcon
            className={styles.close}
            style={{ color: '#00dfc0' }}
            icon={faXmark}
          />
        </button>
      </div>
    ));
  };

  return (
    <>
      <img className={styles.img} src={image} alt="img" />

      <div className={styles.containerForm}>
        <h1>Guest List</h1>
        {JSON.stringify(toggleAttending)}
        <form onSubmit={(event) => event.preventDefault()}>
          <div className={styles.formGroup}>
            <input
              type="input"
              className={styles.formField}
              placeholder="Name"
              id="firstName"
              disabled={isLoading}
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <label htmlFor="firstName" className={styles.formLabel}>
              First name
            </label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="input"
              className={styles.formField}
              placeholder="Name"
              disabled={isLoading}
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
            <label htmlFor="lastName" className={styles.formLabel}>
              Last name
            </label>
          </div>
          <button
            className={`${styles.button} ${styles.marginRight}`}
            onClick={() => addGuest()}
            disabled={isLoading}
          >
            Add guest
          </button>
          <button
            className={styles.button}
            onClick={() => removeAllGuest()}
            disabled={isLoading}
          >
            Remove all
          </button>
          <div>
            <span>Filter guests: </span>
            <select
              className={styles.select}
              defaultValue={isAttending}
              onChange={(event) => {
                setIsAttending(event.currentTarget.value);
                // await chooseAttending().catch((error) => console.log(error));
              }}
              x
            >
              <option value="please select">Please select</option>
              <option value="attending">Attending</option>
              <option value="no attending">No attending</option>
              <option value="show all">Show all</option>
            </select>
          </div>
        </form>
        {isLoading ? <div>Loading...</div> : renderList()}
      </div>
    </>
  );
}
