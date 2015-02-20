/**
 * All user stuff, including auth information.
 *
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var UserUtils = require('./UserUtils');
var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var _user = Immutable.Map({
  user: null,
  auth: null,
  showCalendar: false
});

function receiveAuth(action) {
  var user = UserUtils.getUserFromRawAuth(action.auth);
  _user = _user.merge({auth: action.auth, user: user});
}

function receiveLoggedOut() {
  _user = _user.merge({auth: null, user: null});
}

function receiveUserMeta(action) {
  _user = _user.update('user', user => user.merge({meta: action.meta}));
}

function toggleCalendar() {
  _user = _user.update('showCalendar', showCalendar => !showCalendar);
}

var actions = {};
actions[ActionTypes.RECEIVE_AUTH] = receiveAuth;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;
actions[ActionTypes.RECEIVE_USER_META] = receiveUserMeta;
actions[ActionTypes.TOGGLE_CALENDAR] = toggleCalendar;

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _user;
  }
});
