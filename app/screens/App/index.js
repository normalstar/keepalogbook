'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var appViewActionCreators = require('actions/appViewActionCreators');
var userStore = require('stores/userStore');

require('normalize-css/normalize.css');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      userStore.initialize();
      callback();
    }
  },

  componentWillMount: function() {
    appViewActionCreators.loadApp();
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
