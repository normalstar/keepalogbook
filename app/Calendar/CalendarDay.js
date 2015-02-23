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
    var count = this.props.dayData && this.props.dayData.get('count') || null;
    var classesDef = {
      'calendar-day': true,
      'calendar-day--today': isToday,
      'calendar-day--has-count': count,
      'calendar-day--current-day': this.props.dayData && this.props.dayData.get('isCurrentDay'),
      'calendar-day--has-count--max': false
    };

    if (count && count < 10) {
      classesDef['calendar-day--has-count--' + count] = true;
    } else if (count && count >= 10) {
      classesDef['calendar-day--has-count--max'] = true;
    }

    var reformatted = moment.format('YYYY-MM-DD');
    var split = reformatted.split('-');
    var params = {
      year: split[0],
      month: split[1],
      day: split[2]
    };

    return (
      <Link to="day" params={params} className={classSet(classesDef)}>
        {displayDate}
      </Link>
    );
  }
});

module.exports = CalendarDay;
