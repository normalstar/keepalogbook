'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var ChooseUsername = null;

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');
var chooseUsernameStore = require('./stores/chooseUsernameStore');

var ChooseUsernameHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      require.ensure([], function() {
        ChooseUsername = require('./components/ChooseUsername');
        callback();
      }, 'user');
    }
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [userStore, chooseUsernameStore],

  getStateFromStores: function() {
    return {
      user: userStore.get(),
      chooseUsername: chooseUsernameStore.get()
    };
  },

  render: function() {
    return (
      <ChooseUsername user={this.state.user}
        chooseUsername={this.state.chooseUsername}
      />
    );
  }
});

module.exports = ChooseUsernameHandler;
