/**
 * A group of calendar months.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;
var range = require('lodash/utility/range');

var StoresMixin = require('../StoresMixin');
var dateUtils = require('../shared/dateUtils');
var CalendarsStore = require('./CalendarsStore');
var CalendarsViewActionCreators = require('./CalendarsViewActionCreators');

var Calendar = require('../Calendar/Calendar');

require('./Calendars.less');

var Calendars = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    isCalendarPage: PropTypes.bool
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [CalendarsStore],

  getStateFromStores(): Object {
    return {
      calendars: CalendarsStore.get()
    };
  },

  handleClickAddYear(e: Object) {
    e.preventDefault();
    CalendarsViewActionCreators.addCalendarYear();
  },

  render(): any {
    var currentMonth = dateUtils.getCurrentMoment();
    var months = range(0, 12 * this.props.user.get('calendarYears')).map(minus => {
      var month = currentMonth.clone().subtract(minus, 'months');
      var formatted = month.format('YYYY-M');
      var monthNum = parseInt(formatted.split('-')[1], 10);
      var yearNum = parseInt(formatted.split('-')[0], 10);
      var monthData = this.state.calendars.get('' + yearNum + monthNum) || null;

      return (
        <Calendar year={yearNum}
          month={monthNum}
          key={'' + yearNum + monthNum}
          isCurrentMonth={minus === 0}
          isCalendarPage={this.props.isCalendarPage}
          monthData={monthData}
        />
      );
    });

    var classes = classSet({
      'calendars': true,
      'calendars--page': this.props.isCalendarPage
    });

    return (
      <div className={classes}>
        {months}
        <div className="calendars__more-button">
          <a href="#"
            onClick={this.handleClickAddYear}>
            Another year please
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Calendars;
