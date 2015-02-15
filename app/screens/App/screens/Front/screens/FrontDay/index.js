'use strict';

var React = require('react/addons');
var dateUtils = require('utils/dateUtils');
var Day = require('components/Day');
var { PropTypes } = React;

var FrontDayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  render: function() {
    if (!this.props.user.get('auth')) {
      return null;
    }

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

module.exports = FrontDayHandler;
