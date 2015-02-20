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

var _calendar = Immutable.Map({});

function receiveAddedDay(action: {day: Object}) {
  console.log(action);
}

/**
 * Clear out calendar
 */
function receiveLoggedOut() {
  _calendar = Immutable.Map({});
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_DAY] = receiveAddedDay;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _calendar;
  }
});
