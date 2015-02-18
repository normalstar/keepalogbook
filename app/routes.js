/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var FrontDayHandler = require('./FrontDayHandler/FrontDayHandler');
var DayHandler = require('./DayHandler/DayHandler');

var routes = (
  <Route handler={AppHandler} path="/">
    <Route path="/:year/:month/:day" name="day" handler={DayHandler} />
    <DefaultRoute name="frontDay" handler={FrontDayHandler} />
  </Route>
);

module.exports = routes;
