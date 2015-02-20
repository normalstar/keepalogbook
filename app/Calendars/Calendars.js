/**
 * A group of calendar months.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var range = require('lodash/utility/range');

var StoresMixin = require('../StoresMixin');
var dateUtils = require('../shared/dateUtils');
var UserViewActionCreators = require('../User/UserViewActionCreators');
var CalendarsStore = require('./CalendarsStore');

var Calendar = require('../Calendar/Calendar');

require('./Calendars.less');

var Calendars = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [CalendarsStore],

  getStateFromStores(): Object {
    return {
      calendars: CalendarsStore.get()
    };
  },

  componentWillMount() {
    UserViewActionCreators.listenToCalendar(this.props.user.get('user'));
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToCalendar(this.props.user.get('user'));
  },

  render(): any {
    var currentMonth = dateUtils.getCurrentMoment();
    var months = range(0, 13).map(function(minus) {
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
          monthData={monthData}
        />
      );
    }.bind(this));

    return (
      <div className="calendars">
        {months}
      </div>
    );
  }
});

module.exports = Calendars;
