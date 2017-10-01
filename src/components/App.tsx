import * as React from "react";
import { RadarChart } from './RadarChart/RadarChart';
import { PopularityChart } from './PopularityChart/PopularityChart';


export interface HelloProps { message: string; }

export class App extends React.Component<HelloProps, undefined> {
    render() {
        return (
            <div>
                <h1>Hello {this.props.message}!</h1>
                <RadarChart data={'dataChart'} />
                <PopularityChart data={'popularityChart'} />
            </div>
        )
    }
}