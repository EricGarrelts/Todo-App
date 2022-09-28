import React, { useState } from "react";
import styles from "../../styles/Card.module.css";

type Props = {
    createCard: Function;
};

const NewCard = (props: Props) => {
    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(0);

    async function postCard() {
        const data = {
            header,
            description,
            priority,
        };
        await fetch("/api/cards", {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(data),
        });
    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postCard();
        props.createCard();
    };

    return (
        <div className={`${styles.container} ${styles.new}`}>
            <div className={styles.itemcontainer}>
                <div className={styles.header}>New Card</div>
                <form onSubmit={submitForm}>
                    <label>
                        <div>Header:</div>
                        <input
                            className={styles.input}
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
                        <select
                            onChange={(e) =>
                                setPriority(parseInt(e.target.value))
                            }
                        >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>``
                        </select>
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        </div>
    );
};

export default NewCard;
