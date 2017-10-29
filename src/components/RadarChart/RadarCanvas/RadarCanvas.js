import React from 'react';
import styles from './RadarCanvas.css';

export class RadarCanvas extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {
        let lines = this.props.lines.map((line, index) => {
            return(
                <line key={'axisline'+index} className={styles.RadarCanvas__Axes} 
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}/>
            )
        });
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g transform="translate(0,0)">
                   
                    {lines}
                </g>
            </svg>
        );
    }
}
