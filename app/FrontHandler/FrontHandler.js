/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { RouteHandler } = require('react-router');

var FrontHandlerViewActionCreators = require('./FrontHandlerViewActionCreators');
var StoresMixin = require('../StoresMixin');
var UserStore = require('../User/UserStore');
var Inside = require('../Inside/Inside');
var Outside = require('../Outside/Outside');
var Register = require('../Register/Register');

var FrontHandler = React.createClass({
  mixins: [StoresMixin, PureRenderMixin],

  stores: [UserStore],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  handleClickLogOut(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.logOut();
  },

  render(): any {
    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        <div>
          Logged in as
          {' '}
          {this.state.user.getIn(['user', 'meta', 'displayName'])}
        </div>
        <RouteHandler user={this.state.user} />
        <a href="#" onClick={this.handleClickLogOut}>
          Logout
        </a>
      </Inside> :
      <Outside>
        <RouteHandler user={this.state.user} />
        <Register />
      </Outside>;

    return (
      <div>
        Front
        {content}
      </div>
    );
  }
});

module.exports = FrontHandler;
