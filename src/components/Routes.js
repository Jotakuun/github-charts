import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
  </Route>
);
