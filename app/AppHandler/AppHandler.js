/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
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
    AppHandlerActionCreators.loadApp();
  },

  render: function(): any {
    return (
      <div>
        App!
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppHandler;
