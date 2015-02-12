/**
 * This is the front page with an explanation, demo, and login/register
 * functionality.
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

var Register = require('./components/Register');

var StoresMixin = require('mixins/StoresMixin');
var userStore = require('stores/userStore');

var Front = React.createClass({
  mixins: [PureRenderMixin, StoresMixin],
  stores: [userStore],

  getStateFromStores: function() {
    return {
      user: userStore.get()
    };
  },

  componentWillMount: function() {
    // Check logged in or not status and redirect if necessary
  },

  componentDidUpdate: function() {
    // Check logged in or not status and redirect if necessary
  },

  render: function() {
    return (
      <div>
        Front!
        <div>
          <Register />
        </div>
      </div>
    );
  }
});

module.exports = Front;
