/**
 * This is the route handler for front page.
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var Front = null;

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');

var FrontHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      require.ensure([], function() {
        Front = require('./components/Front');
        callback();
      }, 'front');
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
      <Front user={this.state.user} />
    );
  }
});

module.exports = FrontHandler;
