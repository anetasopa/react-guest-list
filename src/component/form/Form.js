import styles from './Form.module.scss';
import Select from './select/Select';

function Form({
  isLoading,
  setFirstName,
  firstName,
  lastName,
  setLastName,
  addGuest,
  removeAllGuest,
  isAttending,
  setIsAttending,
}) {
  return (
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
      <Select isAttending={isAttending} setIsAttending={setIsAttending} />
    </form>
  );
}

export default Form;
