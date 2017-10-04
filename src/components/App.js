import React from 'react';
import Navbar from './Navbar/Navbar';

import styles from './App.css';

export default ({ children }) => {
  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <Navbar />
      </header>
      <div>
        {children}
      </div>
    </div>
  );
}
