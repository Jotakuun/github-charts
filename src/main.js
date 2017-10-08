import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducer from './store/reducers';

// Components
import App from './components/App';
import Dashboard from './components/Dashboard/Dashboard';

// Base styling
import './global.css';

function configureStore() {
  const store = createStore(
    reducer
  );
  return store;
};

class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider state={configureStore}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
        </Route>
      </Router>
      </Provider>
    )
  }
}

ReactDOM.render((<Main />), document.getElementById('app'));

