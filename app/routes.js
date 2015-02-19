/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var DayHandler = require('./DayHandler/DayHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');

var routes = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route name="today" handler={DayHandler} />
    <Route name="day" path="/:year/:month/:day" handler={DayHandler} />
  </Route>
);

module.exports = routes;
