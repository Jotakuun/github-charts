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
    this.canvasSegments = [];
    this.canvasLevelsText = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.axis !== this.props.axis) {
      this.createCanvasSegments(nextProps.axis);
    }
  }

  createReactCanvas() {

  }

  createCanvasSegments(axis) {
    this.canvasSegments = [];
    this.canvasLevelsText = [];
    const canvasRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
    //canvas segments
    for (let i = 0; i < this.canvas.levels; i++) {
      axis.forEach((data, index) => {
        let levelFactor = canvasRadius * ((i + 1) / this.canvas.levels);
        this.canvasSegments.push({
          x1: levelFactor * (1 - Math.sin(index * 2 * Math.PI / axis.length)),
          y1: levelFactor * (1 - Math.cos(index * 2 * Math.PI / axis.length)),
          x2: levelFactor * (1 - Math.sin((index + 1) * 2 * Math.PI / axis.length)),
          y2: levelFactor * (1 - Math.cos((index + 1) * 2 * Math.PI / axis.length)),
          translateX: ((this.canvas.width / 2) - levelFactor),
          translateY: ((this.canvas.height / 2) - levelFactor)
        })
      })
    }

    // levels text
    for (let i = 0; i < this.canvas.levels; i++) {
      let levelFactor = canvasRadius * ((i + 1) / this.canvas.levels);
      this.canvasLevelsText.push({
        value: ((i + 1) * 100 / this.canvas.levels).toFixed(0),
        x: levelFactor * (1 - 1 * Math.sin(0)),
        y: levelFactor * (1 - 1 * Math.cos(0)),
        translateX: ((this.canvas.width / 2) - (levelFactor - 5)),
        translateY: ((this.canvas.height / 2) - levelFactor)
      })
    }
    
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
            <RadarCanvas width={this.canvas.width} height={this.canvas.height} lines={lines} segments={this.canvasSegments} levelsText={this.canvasLevelsText}/>
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