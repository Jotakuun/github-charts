import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components
import App from './components/App';
import Dashboard from './components/Dashboard/Dashboard';

// Base styling
import './global.css';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      pickedRepos: [
        { author: 'facebook', name: 'react' },
        { author: 'angular', name: 'angular' }
      ]
    }
  }

  setMainState(state) {
    console.log(state)
    // provisional
    /* this.setState( (currentState) => ({
      ...currentState,
      ...state
    })) */
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} state={this.state} setMainState={ (state) => this.setMainState(state)}>
          <IndexRoute component={Dashboard} state={this.state} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render((<Main/>), document.getElementById('app'));

