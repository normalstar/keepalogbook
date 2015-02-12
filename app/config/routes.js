var React = require('react');
var { Route } = require('react-router');

var App = require('../screens/App/index');

var routes = (
  <Route handler={App}>
  </Route>
);

module.exports = routes;
