/**
 * Take a user's days data for calendars.
 *
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var CalendarsUtils = require('./CalendarsUtils');

var _currentDayKey = '';
var _calendars = Immutable.Map();

function receiveAddedDay(action: {rawDay: RawDay}) {
  var { yearKey, monthKey, dayKey } = CalendarsUtils.splitRawDay(action.rawDay.key);
  _calendars = _calendars.mergeIn([yearKey + monthKey, dayKey], {
    count: action.rawDay.value.count
  });
}

function loadDay(action: {dayKey: string}) {
  var prevKeys = _currentDayKey !== '' ? CalendarsUtils.splitRawDay(_currentDayKey) : null;
  var { yearKey, monthKey, dayKey } = CalendarsUtils.splitRawDay(action.dayKey);

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
 * Clear out calendar
 */
function receiveLoggedOut() {
  _calendars = Immutable.Map();
  _currentDayKey = '';
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_CHANGED_DAY] = receiveAddedDay;
actions[ActionTypes.LOAD_DAY] = loadDay;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _calendars;
  }
});
