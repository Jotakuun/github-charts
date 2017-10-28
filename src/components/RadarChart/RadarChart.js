import React from 'react';
import styles from './RadarChart.css';
import Card from '../shared/Card/Card';
import { connect } from 'react-redux';

import * as d3 from 'd3';

class RadarChart extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.axis) {
      this.createCanvas(nextProps.axis);
    }
  }

  createCanvas(data) {
    let config = {
      width: 400,
      height: 400,
      levels: 4
    }
    let g = d3.select('.' + styles.RadarChart__Canvas)
      .append('svg')
      .attr('width', config.width)
      .attr('height', config.height)
      .append('g')
      .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

    let canvasRadius = Math.min(config.width / 2, config.height / 2);

    // canvas segments
    for (let i = 0; i < config.levels; i++) {
      let levelFactor = canvasRadius * ((i + 1) / config.levels);
      g.selectAll('.levels')
        .data(data)
        .enter()
        .append('svg:line')
        .attr('x1', ((d, i) => levelFactor * (1 - Math.sin(i * 2 * Math.PI / data.length))))
        .attr('y1', ((d, i) => levelFactor * (1 - Math.cos(i * 2 * Math.PI / data.length))))
        .attr('x2', ((d, i) => levelFactor * (1 - Math.sin((i + 1) * 2 * Math.PI / data.length))))
        .attr('y2', ((d, i) => levelFactor * (1 - Math.cos((i + 1) * 2 * Math.PI / data.length))))
        .attr('class', styles.RadarChart__Levels)

        .attr('transform', 'translate(' + (config.width / 2 - levelFactor) + ', ' + (config.height / 2 - levelFactor) + ')');
    }

    // levels text
    for (let i = 0; i < config.levels; i++) {
      let levelFactor = canvasRadius * ((i + 1) / config.levels);
      g.selectAll('.levels')
        .data([1])
        .enter()
        .append('svg:text')
        .attr('x', (
          d) => levelFactor * (1 - 1 * Math.sin(0)))
        .attr('y', (d) => levelFactor * (1 - 1 * Math.cos(0)))
        .attr('class', styles.RadarChart__Legend)
        .attr('transform', 'translate(' + (config.width / 2 - levelFactor + 5) + ', ' + (config.height / 2 - levelFactor) + ')')
        .text(((i + 1) * 100 / config.levels).toFixed(0));
    }

    let radians = 2 * Math.PI;

    // axis lines
    data.forEach((axis) => {
      console.log('im an axis', axis)
      g.selectAll('.axisLines')
        .data(data)
        .enter()
        .append('svg:line')
        .attr('x1', (d, i) => config.width / 2)
        .attr('y1', (d, i) => config.height / 2)
        .attr("x2", (d, i) => config.width / 2 * (1 - 1 * Math.sin(i * radians / data.length)))
        .attr("y2", (d, i) => config.height / 2 * (1 - 1 * Math.cos(i * radians / data.length)))
        .attr('class', styles.RadarChart__Axes)
    });


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