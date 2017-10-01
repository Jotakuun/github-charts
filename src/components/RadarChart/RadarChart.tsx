import * as React from "react";

import * as styles from "./RadarChart.css";

export interface RadarChartProps { data: any; }

export class RadarChart extends React.Component<RadarChartProps, undefined> {
    render() {
        return (
            <div className={styles.DataChart}>RadarChart_component</div>
        );
    }
}