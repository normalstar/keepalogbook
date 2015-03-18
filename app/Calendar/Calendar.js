/**
 * A single calendar month.
 *
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var CalendarDayLabels = require('./CalendarDayLabels');
var CalendarWeek = require('./CalendarWeek');

var dateUtils = require('../shared/dateUtils');

require('./Calendar.less');

var Calendar = React.createClass({
  propTypes: {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    isCurrentMonth: PropTypes.bool.isRequired,
    isCalendarPage: PropTypes.bool,
    monthData: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    var monthMoment = dateUtils.parseString('YYYYM', '' + this.props.year + this.props.month);
    var firstWeekSunday = monthMoment.clone().startOf('week');

    function getSundaysInMonth(startSunday, currentMonthDay) {
      var weeks = [startSunday];

      return function addNextSunday(sunday, monthDay) {
        var nextSunday = sunday.clone().add(1, 'w');

        if (nextSunday.isSame(monthDay, 'month')) {
          weeks.push(nextSunday);
          return addNextSunday(nextSunday, monthDay);
        } else {
          return weeks;
        }
      }(startSunday, currentMonthDay);
    }

    var sundayMoments: Array<Object> = getSundaysInMonth(firstWeekSunday, monthMoment);
    var sundays = sundayMoments.map((sunday, index) => {
      return (
        <CalendarWeek sunday={sunday}
          monthDay={monthMoment}
          key={index}
          isCurrentMonth={this.props.isCurrentMonth}
          isCalendarPage={this.props.isCalendarPage}
          monthData={this.props.monthData}
        />
      );
    });

    return (
      <div className="calendar">
        <div className="calendar__month-name">
          {monthMoment.format('MMMM YYYY')}
        </div>
        <CalendarDayLabels sunday={sundayMoments[0]} />
        {sundays}
      </div>
    );
  }
});

module.exports = Calendar;
