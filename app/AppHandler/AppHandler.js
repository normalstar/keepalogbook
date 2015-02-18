/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');
var StoresMixin = require('../StoresMixin');
var Inside = require('../Inside/Inside');
var Outside = require('../Outside/Outside');

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
    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        <RouteHandler user={this.state.user} />
      </Inside> :
      <Outside>
        <RouteHandler user={this.state.user} />
      </Outside>;

    return (
      <div className="app-handler">
        {content}
      </div>
    );
  }
});

module.exports = AppHandler;
