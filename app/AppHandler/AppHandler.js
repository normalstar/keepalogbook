/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');
var StoresMixin = require('../StoresMixin');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      AppHandlerActionCreators.loadApp();
      callback();
    }
  },

  stores: [UserStore],

  mixins: [StoresMixin],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  render(): any {
    return (
      <div className="app-handler">
        <RouteHandler user={this.state.user} />
      </div>
    );
  }
});

module.exports = AppHandler;
