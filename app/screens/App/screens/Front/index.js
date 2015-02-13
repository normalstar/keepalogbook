'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');

var Inside = require('components/Inside');
var Outside = require('components/Outside');

var Register = require('./components/Register');
var frontActionCreators = require('./actions/frontActionCreators');

var FrontHandler = React.createClass({
  mixins: [StoresMixin, PureRenderMixin],

  stores: [userStore],

  getStateFromStores: function() {
    return {
      user: userStore.get()
    };
  },

  /**
   * If not logged in don't do anything. If logged in, query data and put in
   * store. If user doesn't exist, create new user.
   */
  componentDidUpdate: function() {
    if (!this.state.user.get('user')) {
      return;
    }

    // Query and save to store
    if (this.state.user.get('user') && !this.state.user.getIn(['user', 'meta'])) {
      frontActionCreators.getUserMeta(this.state.user.get('user').toJS());
    }

    // If queried and still doesn't exist, create user
    if (this.state.user.get('user') &&
        this.state.user.getIn(['user', 'meta']) &&
        this.state.user.getIn(['user', 'meta', 'needToCreate'])) {

      frontActionCreators.createUser(
        this.state.user.get('user').toJS(),
        this.state.user.get('auth').toJS()
      );
    }
  },

  handleClickLogOut: function(e) {
    e.preventDefault();
    frontActionCreators.logOut();
  },

  render: function() {
    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        <a href="#" onClick={this.handleClickLogOut}>
          Logout
        </a>
      </Inside> :
      <Outside user={this.state.user}>
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
