/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var StoresMixin = require('../StoresMixin');
var Register = require('../Register/Register');
var DayStore = require('../Day/DayStore');
var Day = require('../Day/Day');
var DayHeader = require('../Day/DayHeader');
var DayViewActionCreators = require('../Day/DayViewActionCreators');
var dateUtils = require('../shared/dateUtils');

var FrontDayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, callback) {
      DayStore.initialize(dateUtils.getCurrentDayKey());
      DayViewActionCreators.transitionToDay(DayStore.get().get('day'), true);
      callback();
    },

    willTransitionFrom(transition, component, callback) {
      DayViewActionCreators.transitionFromDay(component.state.day.get('day'));
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
    // We only have to check for auth here because this is the default route.
    if (!this.props.user.get('auth')) {
      return <Register />;
    }

    // If you log out and log in with a different account, user will update
    // first sending an emitChange and the day will start with previous user.
    // Weird.
    if (this.state.day.getIn(['day', 'currentUserId']) !== this.props.user.getIn(['user', 'userId'])) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DayHeader
          displayDate={dateUtils.formatMoment('dddd, LL')(dateUtils.getCurrentMoment())}
          isToday={true}
        />

        <Day day={this.state.day} />
      </div>
    );
  }
});

module.exports = FrontDayHandler;
