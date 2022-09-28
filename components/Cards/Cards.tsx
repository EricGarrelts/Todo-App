import React, { useState, useEffect } from "react";
import styles from "../../styles/Cards.module.css";
import Card from "../Card/Card";
import NewCard from "../Card/NewCard";

type Props = {};

type Card = {
  id: number;
  header: string;
  description: string;
  priority: number;
  created: Date;
};

// Patch request data type
type Patch = {
  header: string;
  description: string;
  priority: number;
};

export default function Cards({}: Props) {
  // sortBy toggle menu
  const [sortToggle, setSortToggle] = useState(false);
  const [currentSort, setCurrentSort] = useState("descending");
  const [newCard, setNewCard] = useState(false);
  // datastream
  const [data, setData] = useState<Card[]>([]);
  // every time this functions state is swapped, useeffect runs
  const [fetchSwitch, setFetchSwitch] = useState(false);

  // Card map variable
  const cards = data.map((card) => (
    <Card
      key={card.id}
      deleteCard={deleteCard}
      patchCard={patchCard}
      runUpdate={runUpdate}
      createCard={createCard}
      id={card.id}
      priority={card.priority}
      header={card.header}
      description={card.description}
    />
  ));

  // ran first paint, then fetchs after state change - currentSort, newCard, fetchSwitch
  useEffect(() => {
    getCards("http://localhost:3000/api/cards", currentSort);
  }, [currentSort, newCard, fetchSwitch]);

  // Delete card fetch method
  async function deleteCard(url: string, cardId: number) {
    await fetch("/api/cards", {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ cardId: cardId }),
    });
  }

  // Update specific card fetch method
  async function patchCard(url: string, cardId: number, newData: Patch) {
    const body = {
      cardId: cardId,
      newData: newData,
    };
    await fetch("/api/cards", {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
  }

  // Get all cards fetch method
  async function getCards(url: string, sort: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        sort,
      },
    });
    const { success, cards } = await response.json();
    if (success) {
      setData(cards);
    }
  }

  // Pass down function for children to refetch api
  function runUpdate() {
    setFetchSwitch(!fetchSwitch);
  }

  // onClick function to toggle view of sort menu
  function handleSort() {
    setSortToggle(!sortToggle);
  }

  // onClick with parameter per button, set currentSort state and refetch
  function setSort(s: string) {
    setCurrentSort(s);
    setSortToggle(false);
  }

  // view function for newCard component
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

        {/* runs if sortToggle is enabled */}
        {!sortToggle ? null : (
          <div className={styles.sortcontainer}>
            <div className={styles.bold}>Sort by: </div>
            <div onClick={() => setSort("priority")} className={styles.pointer}>
              Priority
            </div>
            <div
              onClick={() => setSort("descending")}
              className={styles.pointer}
            >
              Descending
            </div>
            <div
              onClick={() => setSort("ascending")}
              className={styles.pointer}
            >
              Ascending
            </div>
          </div>
        )}
      </div>

      {/* Cards*/}
      <div className={styles.cardcontainer}>
        {newCard ? <NewCard createCard={createCard} /> : ""}

        {/* Variable with all <Card /> components to render */}
        {cards}
      </div>
    </div>
  );
}
