/**
 * @flow
 */

var React = require('react/addons');
var { Route } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var TodayHandler = require('./TodayHandler/TodayHandler');
var DayHandler = require('./DayHandler/DayHandler');
var Inside = require('./Inside/Inside');
var Outside = require('./Outside/Outside');
var FrontHandler = require('./FrontHandler/FrontHandler');

var TodayHandler = require('./TodayHandler/TodayHandler');
var DayHandler = require('./DayHandler/DayHandler');

var routes = (
  <Route handler={AppHandler}>
    <Route handler={Outside}>
      <Route name="front" path="/" handler={FrontHandler} />
    </Route>
    <Route handler={Inside}>
      <Route name="today" handler={TodayHandler} />
      <Route name="day" path="/:year/:month/:day" handler={DayHandler} />
    </Route>
  </Route>
);

module.exports = routes;
