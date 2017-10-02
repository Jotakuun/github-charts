import React from 'react';
import styles from './Dashboard.css';
import RadarChart from '../RadarChart/RadarChart';
import PopularityChart from '../PopularityChart/PopularityChart';


export default class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
        _dashb
        <RadarChart/>
        <PopularityChart/>
      </div>
    );
  }
}
