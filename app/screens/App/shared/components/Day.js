/**
 * List of logs for a day.
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { map } = require('utils/fpUtils').fp;

var StoresMixin = require('mixins/StoresMixin');
var dayStore = require('stores/dayStore');

var Day = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    dayKey: PropTypes.string.isRequired
  },

  stores: [StoresMixin, PureRenderMixin],

  getStateFromStores: {
    day: dayStore.get()
  },

  componentWillMount: function() {

  },

  componentWillUnmount: function() {
  },

  render: function() {
    var logs = map(function(log) {
      return (
        <div>
          {log}
        </div>
      );
    }, this.state.day.get('logs').toArray());

    return (
      <div>
        Day
        {logs}
      </div>
    );
  }
});

module.exports = Day;
