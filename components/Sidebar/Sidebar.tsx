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
          <Link href="/">Dashboard</Link>
        </li>
      </ul>

      {/* Footer */}
      <div className={styles.footer}>
        <p>Developed by Eric Garrelts</p>
        <div className={styles.linkcontainer}>
          <Link href="https://www.linkedin.com/in/ericgarrelts/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Link>
          <Link href="https://github.com/EricGarrelts/Todo-App" passHref>
            <a target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
