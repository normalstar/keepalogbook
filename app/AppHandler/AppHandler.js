/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler, Navigation } = require('react-router');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');
var DayStore = require('../Day/DayStore');
var StoresMixin = require('../StoresMixin');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      DayStore.initialize(); // We initialize here so it gets user data at same time
      AppHandlerActionCreators.loadApp();
      callback();
    }
  },

  stores: [UserStore],

  mixins: [StoresMixin, Navigation],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!prevState.user.get('auth') && this.state.user.get('auth')) {
      this.replaceWith('today');
    } else if (prevState.user.get('auth') && !this.state.user.get('auth')) {
      this.replaceWith('front');
    }
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
