'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var AppViewActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');

require('normalize-css/normalize.css');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      UserStore.initialize();
      callback();
    }
  },

  componentWillMount: function() {
    AppViewActionCreators.loadApp();
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
