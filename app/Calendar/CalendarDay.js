/**
 * A day in a week.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;
var { Link } = require('react-router');

var dateUtils = require('../shared/dateUtils');

require('./CalendarDay.less');

var CalendarDay = React.createClass({
  propTypes: {
    dateString: PropTypes.string.isRequired,
    isCurrentMonth: PropTypes.bool.isRequired,
    isDifferentMonthDay: PropTypes.bool.isRequired,
    dayData: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    var displayDate = this.props.dateString.slice(6, this.props.dateString.length);

    if (this.props.isDifferentMonthDay) {
      return (
        <span className="calendar-day calendar-day--other-month">
        </span>
      );
    }

    var currentMoment = this.props.isCurrentMonth ? dateUtils.getCurrentMoment() : null;
    var moment = dateUtils.parseString('YYYYMMD')(this.props.dateString);
    var isFuture = currentMoment && currentMoment.isBefore(moment, 'day');

    if (isFuture) {
      return (
        <span className="calendar-day calendar-day--future">
          {displayDate}
        </span>
      );
    }

    var isToday = currentMoment && currentMoment.isSame(moment, 'day');
    var classes = classSet({
      'calendar-day': true,
      'calendar-day--today': isToday,
      'calendar-day--current-day': this.props.dayData && this.props.dayData.get('isCurrentDay')
    });
    var reformatted = moment.format('YYYY-MM-DD');
    var split = reformatted.split('-');
    var params = {
      year: split[0],
      month: split[1],
      day: split[2]
    };

    return (
      <Link to="day" params={params} className={classes}>
        {displayDate}
        {' '}
        {this.props.dayData && this.props.dayData.get('count')}
      </Link>
    );
  }
});

module.exports = CalendarDay;
