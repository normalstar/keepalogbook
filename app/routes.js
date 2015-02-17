/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');
var FrontDayHandler = require('./FrontDayHandler/FrontDayHandler');
var DayHandler = require('./DayHandler/DayHandler');

/**
 * Normally you would use a default route there where FrontHandler is but
 * couldn't get the top level handler to listen to changes on the store. But I
 * want the Inside and Outside components to persist as paths change so this
 * seems to work.
 */
var routes = (
  <Route handler={AppHandler} path="/">
    <Route path="/" name="front" handler={FrontHandler}>
      <Route path="/:year/:month/:day" name="day" handler={DayHandler} />
      <DefaultRoute name="frontDay" handler={FrontDayHandler} />
    </Route>
  </Route>
);

module.exports = routes;
