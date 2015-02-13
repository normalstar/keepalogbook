/**
 * List of logs for a day.
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

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

  /**
   * Query if day exists.
   */
  componentWillMount: function() {

  },

  render: function() {
    return (
      <div>Day</div>
    );
  }
});

module.exports = Day;
