'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var User = null;

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');

var UserHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      require.ensure([], function() {
        User = require('./components/User');
        callback();
      }, 'user');
    }
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [userStore],

  getStateFromStores: function() {
    return {
      user: userStore.get()
    };
  },

  render: function() {
    return (
      <User user={this.state.user} />
    );
  }
});

module.exports = UserHandler;
