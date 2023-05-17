import { faFolder, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './List.module.scss';

function List({
  guests,
  updatedGuest,
  deleteGuest,
  editFirstName,
  setEditFirstName,
  editLastName,
  setEditLastName,
  editQuest,
  saveQuest,
  open,
}) {
  return guests.map((guest) => (
    <div key={`user-${guest.id}`} data-test-id="guest">
      <div className={styles.checkboxWrapper}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            aria-label={`${guest.firstName} ${guest.lastName} attending status`}
            checked={guest.attending}
            onChange={() => updatedGuest(guest.id)}
          />
          <span className={styles.checkboxIcon} />
        </label>
      </div>
      <span>{`${guest.firstName} ${guest.lastName}`}</span>
      {open ? (
        <>
          <input
            label="First name"
            value={editFirstName}
            onChange={(event) => setEditFirstName(event.currentTarget.value)}
          />
          <input
            label="Last name"
            value={editLastName}
            onChange={(event) => setEditLastName(event.currentTarget.value)}
          />
          <button
            className={styles.buttonSave}
            aria-label={`Save ${guest.firstName} ${guest.lastName}`}
            onClick={() => saveQuest(editFirstName, editLastName, guest.id)}
          >
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: '#00dfc0' }}
              icon={faFolder}
            />
          </button>
        </>
      ) : null}

      <button
        className={styles.buttonRemove}
        aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
        onClick={() => deleteGuest(guest.id)}
      >
        <FontAwesomeIcon
          className={styles.icon}
          style={{ color: '#00dfc0' }}
          icon={faXmark}
        />
      </button>

      <button
        className={styles.buttonEdit}
        aria-label={`Edit ${guest.firstName} ${guest.lastName}`}
        onClick={() => editQuest(guest.id)}
      >
        <FontAwesomeIcon
          className={styles.icon}
          style={{ color: '#00dfc0' }}
          icon={faPen}
        />
      </button>
    </div>
  ));
}

export default List;
