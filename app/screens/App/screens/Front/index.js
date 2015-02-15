'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { RouteHandler } = require('react-router');

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');

var Inside = require('components/Inside');
var Outside = require('components/Outside');

var Register = require('./components/Register');
var frontViewActionCreators = require('./actions/frontViewActionCreators');

var FrontHandler = React.createClass({
  mixins: [StoresMixin, PureRenderMixin],

  stores: [userStore],

  getStateFromStores: function() {
    return {
      user: userStore.get()
    };
  },

  handleClickLogOut: function(e) {
    e.preventDefault();
    frontViewActionCreators.logOut();
  },

  render: function() {
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
        <RouteHandler />
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
