var React = require('react/addons');
var { Route } = require('react-router');

var AppHandler = require('../screens/App/index');
var FrontHandler = require('../screens/App/screens/Front/index');

/**
 * Normally you would use a default route there where FrontHandler is but
 * couldn't get the top level handler to listen to changes on the store. But I
 * don't want the Inside and Outside components to change as paths change so
 * this seems to work.
 */
var routes = (
  <Route handler={AppHandler} path="/">
    <Route path="/" name="front" handler={FrontHandler}>
    </Route>
  </Route>
);

module.exports = routes;
