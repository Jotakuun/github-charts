import React from "react";
import styles from "./RadarChart.css";
import Card from '../shared/Card/Card';
import { connect } from 'react-redux';

import * as d3 from 'd3';

class RadarChart extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.axis) {
      this.createBackgroundSegments(nextProps.axis);
    }
  }

  createBackgroundSegments(data) {
    let config = {
      width: 400,
      height: 400,
      levels: 3
    }
    let g = d3.select('.' + styles.RadarChart__Canvas)
      .append("svg")
      .attr("width", config.width)
      .attr("height", config.height)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    let canvasRadius = Math.min(config.width / 2, config.height / 2);

    for (let i = 0; i < config.levels; i++) {
      let levelFactor = canvasRadius * ((i + 1) / config.levels);
      g.selectAll(".levels")
        .data(data)
        .enter()
        .append("svg:line")
        .attr("x1", ((d, i) => levelFactor * (1 - Math.sin(i * 2 * Math.PI / data.length))))
        .attr("y1", ((d, i) => levelFactor * (1 - Math.cos(i * 2 * Math.PI / data.length))))
        .attr("x2", ((d, i) => levelFactor * (1 - Math.sin((i + 1) * 2 * Math.PI / data.length))))
        .attr("y2", ((d, i) => levelFactor * (1 - Math.cos((i + 1) * 2 * Math.PI / data.length))))

        .style("stroke", "grey")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px")
        .attr("transform", "translate(" + (config.width / 2 - levelFactor) + ", " + (config.height / 2 - levelFactor) + ")");
    }
  }
  render() {
    return (
      <Card>
        <div className={styles.RadarChart}>
          <h1>RadarChart_component</h1>
          <div className={styles.RadarChart__Canvas}>
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  radarData: state.radar.data,
  repos: state.repos.data,
  pickedRepos: state.repos.pickedRepos,
  axis: state.radar.axis
});

export default connect(mapStateToProps)(RadarChart);