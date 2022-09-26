import React, { useState } from "react";
import styles from "../../styles/Card.module.css";

type Props = {
  createCard: Function;
};

const NewCard = (props: Props) => {
  const [header, setHeader] = useState({});
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState(0);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.createCard();
  };

  return (
    <div className={`${styles.container} ${styles.new}`}>
      <form onSubmit={submitForm}>
        <label>
          Header:
          <input
            type="text"
            required
            onChange={(e) => setHeader(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            className={styles.textarea}
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Priority:
          <select onChange={(e) => setPriority(e.target.value)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewCard;
