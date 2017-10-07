import React from "react";
import styles from "./PopularityChart.css";

import Card from '../shared/Card/Card';

export default class PopularityChart extends React.Component {
  render() {
    return (
      <Card>
        <div className={styles.PopularityChart}>
          <h1>PopularityChart_component</h1>
        </div>
      </Card>
    );
  }
}
