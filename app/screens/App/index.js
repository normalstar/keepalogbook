'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var appActionCreators = require('actions/appActionCreators');

require('normalize-css/normalize.css');

var App = React.createClass({
  componentWillMount: function() {
    appActionCreators.loadApp();
  },

  render: function() {
    return (
      <div className="app">
        App!
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
