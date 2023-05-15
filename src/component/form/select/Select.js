import styles from './Select.module.scss';

function Select({ isAttending, setIsAttending }) {
  return (
    <div>
      <span>Filter guests: </span>
      <select
        className={styles.select}
        defaultValue={isAttending}
        onChange={(event) => {
          setIsAttending(event.currentTarget.value);
          // await chooseAttending().catch((error) => console.log(error));
        }}
      >
        <option value="please select">Please select</option>
        <option value="attending">Attending</option>
        <option value="no attending">No attending</option>
        <option value="show all">Show all</option>
      </select>
    </div>
  );
}

export default Select;
