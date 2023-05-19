import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Form from './component/form/Form';
import List from './component/list/List';
import image from './images/image3.png';

const baseUrl = 'https://c2307a9a-e779-4389-8c23-48c4e3611827.id.repl.co';

export default function App() {
  const [guests, setGuests] = useState([]); // set guests
  const [isLoading, setIsLoading] = useState(true); // set the page is loading
  const [firstName, setFirstName] = useState(''); // set first name of the guest
  const [lastName, setLastName] = useState(''); // set last name of the guest
  const [isAttending, setIsAttending] = useState('please select'); // set is or not attending

  // const [editFirstName, setEditFirstName] = useState(firstName);
  // const [editLastName, setEditLastName] = useState(lastName);
  // const [open, setOpen] = useState(false);

  // fetch for the data from API
  useEffect(() => {
    async function fetchQuests() {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/guests/`);
      const filterFrom = await response.json();

      // is attending
      if (isAttending === 'attending') {
        const filteredListAttending = filterFrom.filter(
          (guest) => guest.attending === true,
        );
        // set to display only attending guests
        setGuests(filteredListAttending);
        // is not attending
      } else if (isAttending === 'no attending') {
        const filteredListNoAttending = filterFrom.filter(
          (guest) => guest.attending === false,
        );
        // set to display only no attending guests
        setGuests(filteredListNoAttending);
      } else {
        // set to display all guests
        setGuests(filterFrom);
      }
    }
    // error
    fetchQuests().catch((error) => console.log(error));
  }, [isAttending]);

  // if got data (guests) loading is false
  useEffect(() => {
    setIsLoading(false);
  }, [guests]);

  // trigger an action on first render
  useEffect(() => {
    async function fetchQuests() {
      setIsLoading(true);
      // get data
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
    // remove value from the inputs
    setFirstName('');
    setLastName('');
  };

  // delete guest
  const deleteGuest = async (para) => {
    console.log(para);
    const response = await fetch(`${baseUrl}/guests/${para}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    // filter guest by id
    const newGuestList = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuestList);
  };

  // delete all guest
  const removeAllGuest = async () => {
    await setIsLoading(true);

    async function getAllGuests() {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/guests/`);
      const allGuests = await response.json();
      for (const guest of allGuests) {
        await deleteGuest(guest.id);
      }
    }
    getAllGuests().catch((error) => console.log(error));

    setGuests([]);
  };

  // update guest
  const updatedGuest = async (para) => {
    const index = guests.findIndex((guest) => guest.id === para);
    const response = await fetch(`${baseUrl}/guests/${para}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attending: !guests[index].attending,
        // firstName: editFirstName,
        // lastName: editLastName,
      }),
    });
    const updatedGuestList = await response.json();
    const newUpdatedGuest = [...guests];
    newUpdatedGuest[index].attending = updatedGuestList.attending;
    setGuests(newUpdatedGuest);
  };

  // const saveQuest = async (first, last, id) => {
  //   const edit = { first: firstName, last: lastName };
  //   await updatedGuest(id, edit);
  //   setOpen(false);
  // };

  // const editQuest = (para) => {
  //   const editGuestList = guests.filter((guest) => guest.id !== para);
  //   setGuests(editGuestList);
  //   setOpen(true);
  // };

  return (
    <>
      <img className={styles.img} src={image} alt="img" />
      <div className={styles.containerForm}>
        <h1>Guest List</h1>
        {JSON.stringify(updatedGuest)}
        <Form
          isLoading={isLoading}
          setFirstName={setFirstName}
          firstName={firstName}
          lastName={lastName}
          setLastName={setLastName}
          addGuest={addGuest}
          removeAllGuest={removeAllGuest}
          isAttending={isAttending}
          setIsAttending={setIsAttending}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <List
            guests={guests}
            updatedGuest={updatedGuest}
            deleteGuest={deleteGuest}
            // editFirstName={editFirstName}
            // setEditFirstName={setEditFirstName}
            // editLastName={editLastName}
            // setEditLastName={setEditLastName}
            // editQuest={editQuest}
            // saveQuest={saveQuest}
            // open={open}
          />
        )}
      </div>
    </>
  );
}
