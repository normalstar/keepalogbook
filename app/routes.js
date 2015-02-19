/**
 * @flow
 */

var React = require('react/addons');
var { Route } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var FrontDayHandler = require('./FrontDayHandler/FrontDayHandler');
var DayHandler = require('./DayHandler/DayHandler');
var Inside = require('./Inside/Inside');
var Outside = require('./Outside/Outside');
var Register = require('./Register/Register');

var routes = (
  <Route handler={AppHandler}>
    <Route handler={Outside}>
      <Route name="front" path="/" handler={Register} />
    </Route>
    <Route handler={Inside}>
      <Route name="today" handler={FrontDayHandler} />
      <Route name="day" path="/:year/:month/:day" handler={DayHandler} />
    </Route>
  </Route>
);

module.exports = routes;
