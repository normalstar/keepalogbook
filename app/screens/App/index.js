'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var appActionCreators = require('actions/appActionCreators');

require('normalize-css/normalize.css');

var AppHandler = React.createClass({
  componentWillMount: function() {
    appActionCreators.loadApp();
  },

  render: function() {
    return (
      <div>
        App!
	<RouteHandler />
      </div>
    );
  }
});

module.exports = AppHandler;
