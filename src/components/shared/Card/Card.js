import React from 'react';

import styles from './Card.css';

export default ({ children }) => {
  return (
    <div className={styles.CardComponent}>
        {children}
    </div>
  );
}
