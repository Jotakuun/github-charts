import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, createStore } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducer from './store/reducers';

// Components
import App from './components/App';
import Dashboard from './components/Dashboard/Dashboard';

// Base styling
import './global.css';

function withProps(Component, props) {
  return function (matchProps) {
    return <Component {...props} {...matchProps} />
  }
}

function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState
  );
  return store;
};


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
    this.setState(state)
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={withProps(App, { state: this.state, setMainState: (state) => this.setMainState(state) })}>
          <IndexRoute component={withProps(Dashboard, { state: this.state })} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render((<Main />), document.getElementById('app'));

