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

type Patch = {
    header: string;
    description: string;
    priority: number;
};

export default function Cards({}: Props) {
    const [sortToggle, setSortToggle] = useState(false);
    const [currentSort, setCurrentSort] = useState("descending");
    const [newCard, setNewCard] = useState(false);
    const [data, setData] = useState<Card[]>([]);
    const [fetchSwitch, setFetchSwitch] = useState(false);

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

    useEffect(() => {
        getCards("http://localhost:3000/api/cards", currentSort);
    }, [currentSort, newCard, fetchSwitch]);

    async function deleteCard(url: string, cardId: number) {
        await fetch("/api/cards", {
            method: "DELETE",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({ cardId: cardId }),
        });
    }

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

    function runUpdate() {
        setFetchSwitch(!fetchSwitch);
    }

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
                        <div
                            onClick={() => setSort("priority")}
                            className={styles.pointer}
                        >
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
                {cards}
            </div>
        </div>
    );
}
