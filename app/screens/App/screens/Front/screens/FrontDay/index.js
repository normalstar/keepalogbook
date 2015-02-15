'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var StoresMixin = require('mixins/StoresMixin');
var dayStore = require('stores/dayStore');

var dateUtils = require('utils/dateUtils');
var Day = require('components/Day');

var FrontDayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      dayStore.initialize(dateUtils.getCurrentDayKey());
      callback();
    }
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [dayStore],

  getStateFromStores: function() {
    return {
      day: dayStore.get()
    };
  },

  render: function() {
    // We only have to check for auth here because this is the default route.
    // Other components will be explicitly inside/outside.
    if (!this.props.user.get('auth')) {
      return null;
    }

    return (
      <div>
        Front day
        <Day day={this.state.day} />
      </div>
    );
  }
});

module.exports = FrontDayHandler;
