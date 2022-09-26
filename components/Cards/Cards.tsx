import React, { useState } from "react";
import styles from "../../styles/Cards.module.css";
import Card from "../Card/Card";
import NewCard from "../Card/NewCard";

type Props = {};

export default function Cards({}: Props) {
  const [sortToggle, setSortToggle] = useState(false);
  const [currentSort, setCurrentSort] = useState("date added");
  const [newCard, setNewCard] = useState(false);

  function handleSort() {
    setSortToggle(!sortToggle);
  }

  function setSort(s: string) {
    setCurrentSort(s);
    setSortToggle(false);
  }

  function createCard() {
    setNewCard(!newCard);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.newcard} onClick={createCard}>
          New Card
        </div>
        <div
          onClick={handleSort}
          className={`${styles.noselect} ${styles.button}`}
        >
          Sort by {currentSort}
        </div>

        {!sortToggle ? null : (
          <div className={styles.sortcontainer}>
            <div className={styles.bold}>Sort by: </div>
            <div onClick={() => setSort("priority")} className={styles.pointer}>
              Priority
            </div>
            <div
              onClick={() => setSort("date added")}
              className={styles.pointer}
            >
              Date Added
            </div>
          </div>
        )}
      </div>

      {/* Cards*/}
      <div className={styles.cardcontainer}>
        {newCard ? <NewCard createCard={createCard} /> : ""}
        <Card priority={0} title="Lorem ipsum" description="test 123123123" />
      </div>
    </div>
  );
}
