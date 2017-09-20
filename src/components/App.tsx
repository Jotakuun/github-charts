import * as React from "react";

export interface HelloProps { message: string; }

export class App extends React.Component {
    render() {
        return <h1>Hello!</h1>;
    }
}