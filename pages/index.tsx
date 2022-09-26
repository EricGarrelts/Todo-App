import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.contentcontainer}>
        <Header />
        <Cards />
      </div>
    </div>
  );
};

export default Home;
