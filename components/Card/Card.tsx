import React, { useState } from "react";
import styles from "../../styles/Card.module.css";
import EditCard from "./EditCard";

type Props = {
  deleteCard: Function;
  patchCard: Function;
  runUpdate: Function;
  createCard: Function;
  id: number;
  priority: number;
  header: string;
  description: string;
};

export default function Card(props: Props) {
  const [editMode, setEditMode] = useState(false);

  // If edit component is showing
  function handleEdit() {
    setEditMode(!editMode);
  }

  // middleman function for api
  function handleDelete() {
    props.deleteCard("http:localhost:3000/api/cards", props.id);
    props.runUpdate();
  }

  return (
    <div
      className={`${styles.container} ${
        props.priority == 0 ? styles.low : ""
      } ${props.priority == 1 ? styles.medium : ""}
      ${props.priority == 2 ? styles.high : ""}`}
    >
      {editMode && (
        <div className={styles.itemcontainer}>
          <div className={styles.header}>Edit Card {props.id}</div>
          <EditCard
            patchCard={props.patchCard}
            id={props.id}
            runUpdate={props.runUpdate}
            handleEdit={handleEdit}
            priority={props.priority}
            header={props.header}
            description={props.description}
          />
          <div className={styles.footer}>
            <div className={styles.edit} onClick={handleEdit}>
              Exit
            </div>
            <div
              className={`${styles.red} ${styles.edit}`}
              onClick={handleDelete}
            >
              Delete Card
            </div>
          </div>
        </div>
      )}
      {!editMode && (
        <div className={styles.itemcontainer}>
          <div className={styles.header}>{props.header}</div>
          <div className={styles.info}>{props.description}</div>
          <div className={styles.footer}>
            <div className={styles.edit} onClick={handleEdit}>
              Edit
            </div>
            <div className={styles.green} onClick={handleDelete}>
              Complete
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
