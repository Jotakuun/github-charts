import React from "react";
import styles from "./RadarChart.css";
import Card from '../shared/Card/Card';
import { connect } from 'react-redux';

import * as d3 from 'd3';

class RadarChart extends React.Component {

  render() {
    let radarData;
    if (this.props.radarData) {
      radarData = this.props.radarData.map((data, index) => {
        return (
          <li key={index}>{data.name} - {data.forks} - {data.open_issues}</li>
        );
      })
    }
    
    return (
      <Card>
        <div className={styles.RadarChart}>
          <h1>RadarChart_component</h1>
          <ul>
            {radarData}
          </ul>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  radarData: state.radar.data,
  repos: state.repos.data,
  pickedRepos: state.repos.pickedRepos
});

export default connect(mapStateToProps)(RadarChart);