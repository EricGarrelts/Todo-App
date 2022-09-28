import Link from "next/link";
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
      </ul>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Developed by Eric Garrelts</p>
        <div className={styles.linkcontainer}>
          <Link href="https://www.linkedin.com/in/ericgarrelts/">
            <a target="_blank">LinkedIn</a>
          </Link>
          <Link href="https://github.com/EricGarrelts/Todo-App">
            <a target="_blank">Source Code</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
