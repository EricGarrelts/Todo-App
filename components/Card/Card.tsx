import React, { useState } from "react";
import styles from "../../styles/Card.module.css";

type Props = {
    priority: number;
    header: string;
    description: string;
};

export default function Card(props: Props) {
    return (
        <div
            className={`${styles.container} ${
                props.priority == 0 ? styles.low : ""
            } ${props.priority == 1 ? styles.medium : ""}
      ${props.priority == 2 ? styles.high : ""}`}
        >
            <div className={styles.header}>{props.header}</div>
            <div className={styles.info}>{props.description}</div>
            <div className={styles.footer}>
                <div className={styles.edit}>Edit</div>
                <div className={styles.green}>Complete</div>
            </div>
        </div>
    );
}
