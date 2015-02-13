var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('../screens/App/index');
var FrontHandler = require('../screens/App/screens/Front/index');

var routes = (
  <Route handler={AppHandler} path="/">
    <DefaultRoute name="front" handler={FrontHandler} />
  </Route>
);

module.exports = routes;
