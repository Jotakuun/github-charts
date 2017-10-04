import React from "react";
import styles from "./Navbar.css";

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className={styles.Navbar}>
        <span>Nav</span>   
      </nav>
    );
  }
}
