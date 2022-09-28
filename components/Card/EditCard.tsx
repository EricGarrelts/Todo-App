import React, { useState } from "react";
import styles from "../../styles/Card.module.css";

type Props = {
    patchCard: Function;
    id: number;
    runUpdate: Function;
    handleEdit: Function;
    priority: number;
    header: string;
    description: string;
};

const EditCard = (props: Props) => {
    const [header, setHeader] = useState(props.header);
    const [priority, setPriority] = useState(props.priority);
    const [description, setDescription] = useState(props.description);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.patchCard("http:localhost:3000/api/cards", props.id, {
            header: header,
            description: description,
            priority: priority,
        });
        props.handleEdit();
        props.runUpdate();
    }

    return (
        <div className={styles.formcontainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>Header:</div>
                    <input
                        value={header}
                        className={styles.input}
                        type="text"
                        required
                        onChange={(e) => setHeader(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        className={styles.textarea}
                        maxLength={250}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Priority:
                    <select
                        value={priority}
                        onChange={(e) => setPriority(parseInt(e.target.value))}
                    >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </label>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
};

export default EditCard;
