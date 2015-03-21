/**
 * Take a user's days data for calendars.
 *
 * @flow
 */

var Immutable = require('immutable');

var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var CalendarsUtils = require('./CalendarsUtils');
var dateUtils = require('../shared/dateUtils');

var _currentDayKey = '';
var _calendars = Immutable.Map();

function receiveAddedDay(action: {rawDay: RawDay}) {
  var { yearKey, monthKey, dayKey } = CalendarsUtils.splitDayKey(action.rawDay.key);
  _calendars = _calendars.mergeIn([yearKey + monthKey, dayKey], {
    count: action.rawDay.value.count
  });
}

function receiveRemovedDay(action: {rawDay: RawDay}) {
  var { yearKey, monthKey, dayKey } = CalendarsUtils.splitDayKey(action.rawDay.key);
  _calendars = _calendars.updateIn([yearKey + monthKey, dayKey], day => day.remove('count'));
}

function transitionToDay(action: {dayKey: string}) {
  var prevKeys = _currentDayKey !== '' ? CalendarsUtils.splitDayKey(_currentDayKey) : null;
  var { yearKey, monthKey, dayKey } = CalendarsUtils.splitDayKey(action.dayKey);

  _calendars = _calendars.withMutations(calendars => {
    if (prevKeys) {
      calendars.mergeIn([prevKeys.yearKey + prevKeys.monthKey, prevKeys.dayKey], {
        isCurrentDay: false
      });
    }

    calendars.mergeIn([yearKey + monthKey, dayKey], {
      isCurrentDay: true
    });
  });

  _currentDayKey = action.dayKey;
}

/**
 * We'll act like this is transitioning to another day, with the key for the
 * current day. This is because we can't dispatch the transition to day event
 * on log in.
 */
function receiveAuth() {
  transitionToDay({dayKey: dateUtils.getCurrentDayKey()});
}

/**
 * Clear out calendar
 */
function receiveLoggedOut() {
  _calendars = Immutable.Map();
  _currentDayKey = '';
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_CHANGED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_REMOVED_DAY] = receiveRemovedDay;
actions[ActionTypes.TRANSITION_TO_DAY] = transitionToDay;
actions[ActionTypes.RECEIVE_AUTH] = receiveAuth;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;

class CalendarsStore extends Store {
  initialize() {
  }

  get() {
    return _calendars;
  }
}

module.exports = new CalendarsStore(actions);
