/**
 * @flow
 */

var React = require('react/addons');
var { Route } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');

var OutsideHandler = require('./OutsideHandler/OutsideHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');

var InsideHandler = require('./InsideHandler/InsideHandler');
var TodayHandler = require('./TodayHandler/TodayHandler');
var DayHandler = require('./DayHandler/DayHandler');

var routes = (
  <Route handler={AppHandler}>
    <Route handler={OutsideHandler}>
      <Route name="front" path="/" handler={FrontHandler} />
    </Route>
    <Route handler={InsideHandler}>
      <Route name="today" handler={TodayHandler} />
      <Route name="day" path="/:year/:month/:day" handler={DayHandler} />
    </Route>
  </Route>
);

module.exports = routes;
