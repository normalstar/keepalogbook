/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var compose = require('lodash/function/compose');

var StoresMixin = require('../StoresMixin');
var DayStore = require('../Day/DayStore');
var Day = require('../Day/Day');
var DayHeader = require('../Day/DayHeader');
var DayViewActionCreators = require('../Day/DayViewActionCreators');
var dateUtils = require('../shared/dateUtils');

var DayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, callback) {
      var { year, month, day } = params;
      var dayKey = year + month + day + '';
      var momentDate = dateUtils.parseDayKey(dayKey);
      var isValidDayKey = momentDate.isValid();
      var isInFuture = dateUtils.isInFuture(momentDate);

      if (isInFuture ||
          !isValidDayKey ||
          year.length !== 4 ||
          month.length !== 2 ||
          day.length !== 2) {
        transition.redirect('today');
      }

      DayStore.initialize(dayKey);
      DayViewActionCreators.transitionToDay();
      callback();
    }
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [DayStore],

  getStateFromStores(): Object {
    return {
      day: DayStore.get()
    };
  },

  render(): any {
    if (!this.state.day.get('day')) {
      return null;
    }

    var displayDate = compose(dateUtils.formatMoment('dddd, LL'), dateUtils.parseDayKey);

    return (
      <div>
        <DayHeader
          displayDate={displayDate(this.state.day.getIn(['day', 'dayKey']))}
          isToday={false}
        />

        <Day day={this.state.day} />
      </div>
    );
  }
});

module.exports = DayHandler;
