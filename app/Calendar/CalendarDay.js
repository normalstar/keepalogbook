/**
 * A day in a week.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;

// var dateUtils = require('../shared/dateUtils');

require('./CalendarDay.less');

var CalendarDay = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired,
    dayData: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    var classes = classSet({
      'calendar-day': true,
      'calendar-day--other-month': this.props.day.isDifferentMonth,
      'calendar-day--today': this.props.day.isToday,
      'calendar-day--future': this.props.day.isFuture
    });

    return (
      <span className={classes}>
        {this.props.day.moment.format('D')}
        {' '}
        {this.props.dayData && this.props.dayData.get('count')}
      </span>
    );
  }
});

module.exports = CalendarDay;
