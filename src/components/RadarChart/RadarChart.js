import React from 'react';
import styles from './RadarChart.css';
import Card from '../shared/Card/Card';
import { connect } from 'react-redux';
import { changeAxis } from '../../store/actions';

import { RadarCanvas } from './RadarCanvas/RadarCanvas';

import * as d3 from 'd3';

class RadarChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = {
      width: 400,
      height: 400,
      levels: 4
    };
    this.canvasRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
  }

  render() {
    const radians = 2 * Math.PI;
    let lines = [];
    if (this.props.axis) {
      lines = this.props.axis.map((axis, i) => ({
          x1: this.canvas.width / 2,
          y1: this.canvas.height / 2,
          x2: this.canvas.width / 2 * (1 - 1 * Math.sin(i * radians / this.props.axis.length)),
          y2: this.canvas.height / 2 * (1 - 1 * Math.cos(i * radians / this.props.axis.length))
      }));
  }
    return (
      <Card>
        <div className={styles.RadarChart}>
          <h1>RadarChart_component</h1>
          <div className={styles.RadarChart__Canvas}>
            <RadarCanvas width={this.canvas.width} height={this.canvas.height} lines={lines} />
          </div>
          <button onClick={this.props.changeAxis}>change axis</button>
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

const mapDispatchToProps = (dispatch) => ({
  changeAxis() {
    dispatch(changeAxis({}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RadarChart);