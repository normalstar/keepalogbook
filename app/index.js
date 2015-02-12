'use strict';

var React = require('react/addons');
var Router = require('react-router');
var routes = require('./config/routes');

module.exports = Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
