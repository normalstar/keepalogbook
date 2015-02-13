'use strict';

var React = require('react/addons');
var dateUtils = require('utils/dateUtils');
var Day = require('components/Day');
var { PropTypes } = React;

var FrontDay = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        Front day
        <Day dayKey={dateUtils.getCurrentDayKey()}
          user={this.props.user}
        />
      </div>
    );
  }
});

module.exports = FrontDay;
