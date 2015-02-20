/**
 * A week starting from Sunday.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var range = require('lodash/utility/range');
var CalendarDay = require('./CalendarDay');

var CalendarWeek = React.createClass({
  propTypes: {
    sunday: PropTypes.object.isRequired,
    monthDay: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool.isRequired,
    monthData: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    var days = range(0, 7).map((plus, index) => {
      var moment = this.props.sunday.clone().add(plus, 'day');
      var isDifferentMonthDay = !moment.isSame(this.props.monthDay, 'month');
      var dateString = moment.format('YYYYMMD');
      var dayString = dateString.slice(6, dateString.length);
      var dayData = this.props.monthData && this.props.monthData.get(dayString) || null;

      return (
        <CalendarDay
          dateString={dateString}
          isCurrentMonth={this.props.isCurrentMonth}
          isDifferentMonthDay={isDifferentMonthDay}
          key={index}
          dayData={dayData}
        />
      );
    });

    return (
      <div>
        {days}
      </div>
    );
  }
});

module.exports = CalendarWeek;
