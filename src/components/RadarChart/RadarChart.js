import React from "react";
import styles from "./RadarChart.css";

import Card from '../shared/Card/Card';

import * as d3 from 'd3';

export default class RadarChart extends React.Component {

  render() {
    return (
      <Card>
      <div className={styles.RadarChart}>
        <h1>RadarChart_component</h1>      
      </div>
      </Card>
    );
  }
}
