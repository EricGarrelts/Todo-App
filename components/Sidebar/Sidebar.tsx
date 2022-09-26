import React from "react";
import styles from "../../styles/Sidebar.module.css";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Todo App</div>
      <ul className={styles.items}>
        <li className={styles.item}>
          <a href="/">Dashboard</a>
        </li>
        <li className={styles.item}>
          <a href="/">Placeholder</a>
        </li>
        <li className={styles.item}>
          <a href="/">placeholder</a>
        </li>
      </ul>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Developed by Eric Garrelts</p>
        <div className={styles.linkcontainer}>
          <a href="https://www.linkedin.com/in/ericgarrelts/" target="_blank">
            LinkedIn
          </a>
          <a>Source Code</a>
        </div>
      </div>
    </div>
  );
}
