/**
 * List of logs for a day.
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var StoresMixin = require('stores/StoresMixin');

var Day = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired

  },

  stores: [StoresMixin, PureRenderMixin],

  getStateFromStores: {
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
