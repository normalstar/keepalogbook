/**
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { State } = require('react-router');
var compose = require('lodash/function/compose');

var StoresMixin = require('../StoresMixin');
var DayStore = require('../Day/DayStore');
var Day = require('../Day/Day');
var DayHeader = require('../Day/DayHeader');
var DayViewActionCreators = require('../Day/DayViewActionCreators');
var dateUtils = require('../shared/dateUtils');

var DayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  statics: {
    willTransitionTo(transition, params, query, callback) {
      if (!params.year) {
        DayStore.initialize(dateUtils.getCurrentDayKey());
      } else {
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
      }

      // This will mean you weren't redirected from the front page.
      if (DayStore.get().getIn(['day', 'dayKey'])) {
        DayViewActionCreators.transitionToDay(DayStore.get().getIn(['day', 'dayKey']));
      }

      callback();
    }
  },

  mixins: [StoresMixin, PureRenderMixin, State],

  stores: [DayStore],

  getStateFromStores(): Object {
    return {
      day: DayStore.get()
    };
  },

  render(): any {
    if (!this.props.user) { return null; }

    // If you log out and log in with a different account, user will update
    // first sending an emitChange and the day will start with previous user.
    // Weird.
    if (this.state.day.getIn(['day', 'currentUserId']) !== this.props.user.getIn(['user', 'userId'])) {
      return <div>Loading...</div>;
    }

    // We start listening in this component so need to make sure the data
    // is there to get the right firebase url.
    var day = this.state.day.getIn(['day', 'dayKey']) ?
      <Day day={this.state.day} /> : null;

    var isToday = this.getPath().indexOf('today') > -1;

    var getDisplayDate = compose(dateUtils.formatMoment('dddd, LL'), dateUtils.parseDayKey);
    var displayDate = isToday ?
      getDisplayDate(dateUtils.getCurrentDayKey()) :
      getDisplayDate(this.state.day.getIn(['day', 'dayKey']));

    return (
      <div>
        <DayHeader
          displayDate={displayDate}
          isToday={isToday}
        />

        {day}
      </div>
    );
  }
});

module.exports = DayHandler;
