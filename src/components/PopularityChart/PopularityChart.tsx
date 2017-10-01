import * as React from "react";

import * as styles from "./PopularityChart.css";

export interface RadarChartProps { data: any; }

export class PopularityChart extends React.Component<RadarChartProps, undefined> {
    render() {
        return (
            <div className={styles.PopularityChart}>PopularityChart_component</div>
        );
    }
}