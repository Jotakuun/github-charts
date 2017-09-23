import * as React from "react";

export interface HelloProps { message: string; }

export class App extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Hello {this.props.message}!</h1>;
    }
}