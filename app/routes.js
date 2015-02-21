/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var DayHandler = require('./DayHandler/DayHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');
var CalendarsHandler = require('./CalendarsHandler/CalendarsHandler');

var routes = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route name="today" handler={DayHandler} />
    <Route name="calendar" handler={CalendarsHandler} />
    <Route name="day" path="/:year/:month/:day" handler={DayHandler} />
  </Route>
);

module.exports = routes;
