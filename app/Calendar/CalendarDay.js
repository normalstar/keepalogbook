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

var CalendarWeek = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var classes = classSet({
      'calendar-day': true,
      'calendar-day--other-month': this.props.day.isDifferentMonth
    });

    return (
      <span className={classes}>
        {this.props.day.moment.format('D')}
      </span>
    );
  }
});

module.exports = CalendarWeek;
