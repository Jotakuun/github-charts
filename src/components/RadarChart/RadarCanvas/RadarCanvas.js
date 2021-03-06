import React from 'react';
import styles from './RadarCanvas.css';

export class RadarCanvas extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let segments = this.props.segments.map((line, index) => {
            return (
                <line key={'segmentLine' + index} className={styles.RadarCanvas__Levels}
                    x1={line.x1} y1={line.y1}
                    x2={line.x2} y2={line.y2}
                    transform={'translate(' + line.translateX + ',' + line.translateY + ')'} />
            )
        })
        let lines = this.props.lines.map((line, index) => {
            return (
                <line key={'axisline' + index} className={styles.RadarCanvas__Axes}
                    x1={line.x1} y1={line.y1}
                    x2={line.x2} y2={line.y2}
                    transform={'translate(' + line.translateX + ',' + line.translateY + ')'} />
            )
        });
        let levelsText = this.props.levelsText.map((value, index) => {
            return (
                <text key={'levelsText' + index} className={styles.RadarCanvas__LevelsText}
                    x={value.x} y={value.y}
                    transform={'translate(' + value.translateX + ',' + value.translateY + ')'}>{value.value}</text>
            )
        })
        let axisText = this.props.axisText.map((value, index) => {
            return (
                <text key={'axis' + index} className={styles.RadarCanvas__AxisText}
                    x={value.x} y={value.y}
                    transform={'translate(' + value.translateX + ',' + value.translateY + ')'}>{value.text}</text>
            )
        })
        return (
            <svg className="radarCanvas" width={this.props.width} height={this.props.height}>
                <g transform="translate(0,0)">
                    {segments}
                    {levelsText}
                    {axisText}
                    {lines}
                </g>
            </svg>
        );
    }
}
