import React from 'react';
import styles from './RadarChart.css';
import Card from '../shared/Card/Card';
import { connect } from 'react-redux';

import { RadarCanvas } from './RadarCanvas/RadarCanvas';
import RadarOptions from './RadarOptions/RadarOptions';

import * as d3 from 'd3';

class RadarChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = {
      width: 400,
      height: 400,
      levels: 4,
      maxValue: 0,
      margin: 200
    };
    this.canvasRadius = Math.min((this.canvas.width - this.canvas.margin / 2) / 2, (this.canvas.height - this.canvas.margin / 2) / 2);
    this.canvasSegments = [];
    this.canvasLevelsText = [];
    this.canvasAxisText = [];
    this.hightlightRepo = this.hightlightRepo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.axis !== this.props.axis) {
      // recalculate maxValue
      this.canvas.maxValue = d3.max(nextProps.axis, (i) => {
        return d3.max(i.map(axis => axis.value))
      });

      this.createCanvasSegments(nextProps.axis[0]);
      this.drawData(nextProps.axis);
    }
    if (nextProps.highlightRepo !== this.props.highlightRepo && this.props.optionSelected === 'Overall') {
      this.hightlightRepo(nextProps.highlightRepo);
    }
  }

  hightlightRepo(repo) {
    const t = d3.transition()
      .duration(200)
      .ease(d3.easeSinInOut);
    let wrap = d3.selectAll('.radarArea').transition(t);
    let path = d3.selectAll('.radarStroke').transition(t);
    let circles = d3.selectAll('.edgeCircle').transition(t);
    if (repo) {
      wrap.attr('opacity', (d) =>
        d[0].color === repo.color ? 0.9 : 0.1
      );
      path.attr('opacity', (d) =>
        d[0].color === repo.color ? 0.9 : 0.3
      );
      circles.style('fill-opacity', (d) =>
        d.color === repo.color ? 0.9 : 0.3
      );
    } else {
      wrap.attr('opacity', 0.7);
      path.attr('opacity', 0.9);
      circles.style('fill-opacity', 1);
    }
  }

  drawData(data) {
    d3.selectAll(".radarWrapper").remove();

    const canvas = d3
      .select('.radarCanvas');

    const rScale = d3.scaleLinear()
      .range([0, this.canvasRadius])
      .domain([0, this.canvas.maxValue]);

    const angleSlice = Math.PI * 2 / data[0].length;

    const radarLine = d3.radialLine()
      .curve(d3.curveLinearClosed)
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    const polygon = canvas.selectAll('.radarCanvas')
      .data(data)
      .enter().append('g')
      .attr('class', 'radarWrapper')
      .style('transform',
      `translate(${(this.canvas.width + this.canvas.margin / 2) / 2}px,
      ${(this.canvas.height + this.canvas.margin / 2) / 2}px)`);

    polygon.append('path')
      .attr('class', 'radarArea')
      .attr('d', (d, i) => radarLine(d))
      .style('fill', (d, i) => d[0].color)
      .style('fill-opacity', 0.5);

    polygon.append('path')
      .attr('class', 'radarStroke')
      .attr('d', (d, i) => radarLine(d))
      .style('stroke-width', 2 + 'px')
      .style('stroke', (d) => d[0].color)
      .style('fill', 'none');

    polygon.selectAll('.radarCircle')
      .data((d, i) => d)
      .enter().append('circle')
      .attr('class', 'edgeCircle')
      .attr('r', 4)
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('fill', (d) => d.color)
      .style('fill-opacity', 1);
  }

  createCanvasSegments(axis) {
    this.canvasSegments = [];
    this.canvasLevelsText = [];
    this.canvasAxisText = [];

    const canvasRadius = this.canvasRadius;
    //canvas segments
    for (let i = 0; i < this.canvas.levels; i++) {
      axis.forEach((data, index) => {
        let levelFactor = canvasRadius * ((i + 1) / this.canvas.levels);
        this.canvasSegments.push({
          x1: levelFactor * (1 - Math.sin(index * 2 * Math.PI / axis.length)),
          y1: levelFactor * (1 - Math.cos(index * 2 * Math.PI / axis.length)),
          x2: levelFactor * (1 - Math.sin((index + 1) * 2 * Math.PI / axis.length)),
          y2: levelFactor * (1 - Math.cos((index + 1) * 2 * Math.PI / axis.length)),
          translateX: (((this.canvas.width + this.canvas.margin / 2) / 2) - levelFactor),
          translateY: (((this.canvas.height + this.canvas.margin / 2) / 2) - levelFactor)
        })
      })
    }

    // levels text
    for (let i = 0; i < this.canvas.levels; i++) {
      let levelFactor = canvasRadius * ((i + 1) / this.canvas.levels);
      this.canvasLevelsText.push({
        value: ((i + 1) * this.canvas.maxValue / this.canvas.levels).toFixed(0),
        x: levelFactor * (1 - 1 * Math.sin(0)),
        y: levelFactor * (1 - 1 * Math.cos(0)),
        translateX: (((this.canvas.width + this.canvas.margin / 2) / 2) - (levelFactor - 5)),
        translateY: (((this.canvas.height + this.canvas.margin / 2) / 2) - levelFactor)
      })
    }

    // axis text
    const factorLegend = 1.3;
    const totalAxis = axis.length;
    const rScale = d3.scaleLinear()
      .range([0, this.canvasRadius])
      .domain([0, this.canvas.maxValue]);

    axis.forEach((axis, i) => {
      this.canvasAxisText.push({
        text: axis.axis,
        x: rScale(this.canvas.maxValue * factorLegend) * Math.cos(Math.PI * 2 / totalAxis * i - Math.PI / 2),
        y: rScale(this.canvas.maxValue * factorLegend) * Math.sin(Math.PI * 2 / totalAxis * i - Math.PI / 2),
        translateX: this.canvas.width / 2 + 50,
        translateY: this.canvas.height / 2 + 50
      })
    });
  }
  render() {
    const radians = 2 * Math.PI;
    let lines = [];
    if (this.props.axis) {
      lines = this.props.axis[0].map((axis, i) => ({
        x1: (this.canvas.width - this.canvas.margin / 2) / 2,
        y1: (this.canvas.height - this.canvas.margin / 2) / 2,
        x2: (this.canvas.width - this.canvas.margin / 2) / 2 * (1 - 1 * Math.sin(i * radians / this.props.axis[0].length)),
        y2: (this.canvas.height - this.canvas.margin / 2) / 2 * (1 - 1 * Math.cos(i * radians / this.props.axis[0].length)),
        translateX: this.canvas.margin / 2,
        translateY: this.canvas.margin / 2
      }));
    }
    let showRadar;
    if (this.props.repos) {
      showRadar = this.props.repos.length >= 3 ? true : false;
    }
    return (
      <Card>
        <div className={styles.RadarChart}>
          <div>
            <RadarOptions />
          </div>
          {
            showRadar ?
              <div className={styles.RadarChart__Canvas}>
                <RadarCanvas width={(this.canvas.width + this.canvas.margin)}
                  height={(this.canvas.height + this.canvas.margin)}
                  lines={lines}
                  segments={this.canvasSegments}
                  levelsText={this.canvasLevelsText}
                  axisText={this.canvasAxisText} />
              </div> : <div className={styles.RadarChart__NoContent}><span>Please pick at least 3 repositories</span></div>
          }
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  radarData: state.radar.data,
  repos: state.repos.data,
  pickedRepos: state.repos.pickedRepos,
  axis: state.radar.axis,
  optionSelected: state.radar.optionSelected
});

export default connect(mapStateToProps)(RadarChart);