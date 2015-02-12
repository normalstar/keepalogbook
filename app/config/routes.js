var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var App = require('../screens/App/index');
var Front = require('../screens/App/screens/Front/index');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="front" handler={Front} />
  </Route>
);

module.exports = routes;
