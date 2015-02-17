/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      callback();
    }
  },

  componentWillMount() {
    AppHandlerActionCreators.loadApp();
  },

  render(): any {
    return (
      <div className="app-handler">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppHandler;
