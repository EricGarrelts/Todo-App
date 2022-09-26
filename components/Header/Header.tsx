import React from "react";
import styles from "../../styles/Header.module.css";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Dashboard</div>
      </div>
    </div>
  );
}
