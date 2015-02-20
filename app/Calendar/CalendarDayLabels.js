/**
 * A row of day labels
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var range = require('lodash/utility/range');

require('./CalendarDay.less');

var CalendarDayLabels = React.createClass({
  propTypes: {
    sunday: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var days = range(0, 7).map((plus, index) => {
      var moment = this.props.sunday.clone().add(plus, 'day');
      var label = moment.format('dd');
      return (
        <span className="calendar-day"
          key={index}>
          {label}
        </span>
      );
    });

    return (
      <div>
        {days}
      </div>
    );
  }
});

module.exports = CalendarDayLabels;
