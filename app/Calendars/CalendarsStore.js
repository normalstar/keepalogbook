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

var _calendars = Immutable.Map({});

function receiveAddedDay(action: {rawDay: RawDay}) {
  _calendars = CalendarsUtils.addRawDayIntoCalendar(action.rawDay, _calendars);
}

/**
 * Clear out calendar
 */
function receiveLoggedOut() {
  _calendars = Immutable.Map({});
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_CHANGED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _calendars;
  }
});
