var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var App = require('../screens/App/index');
var FrontHandler = require('../screens/App/screens/Front/index');
var UserHandler = require('../screens/App/screens/User/index');
var ChooseUsernameHandler = require('../screens/App/screens/ChooseUsername/index');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route path="/choose" name="user" handler={ChooseUsernameHandler} />
    <Route path="/:user" name="user" handler={UserHandler} />
  </Route>
);

module.exports = routes;
