import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './List.module.scss';

function List({ guests, toggleAttending, deleteGuest }) {
  console.log(guests);
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
          className={styles.icon}
          style={{ color: '#00dfc0' }}
          icon={faXmark}
        />
      </button>
      <button
        className={styles.buttonEdit}
        aria-label={`Edit ${guest.firstName} ${guest.lastName}`}
        onClick={() => deleteGuest(guest.id)}
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
