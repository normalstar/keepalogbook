'use strict';

var Immutable = require('immutable');

var logUtils = require('utils/logUtils');
var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');
var appDispatcher = require('dispatchers/appDispatcher');

var userStore = require('stores/userStore');
var dayUtils = require('utils/dayUtils');

var _dayKey = '';
var _user = null;

function getFreshDay() {
  return Immutable.Map({
    day: dayUtils.convertDataForDay(_dayKey, _user),
    logs: Immutable.List(),
    currentLog: ''
  });
}

var _day = getFreshDay();

var actions = {};

actions[ACTION_TYPES.RECEIVE_ADDED_LOG] = function(action) {
  var converted = logUtils.convertRawLog(action.rawLog);
  _day = _day.update('logs', function(logs) {
    return logs.push(converted);
  });
};

actions[ACTION_TYPES.CHANGE_CURRENT_LOG] = function(action) {
  _day = _day.set('currentLog', action.value);
};

actions[ACTION_TYPES.SUBMIT_CURRENT_LOG] = function() {
  _day = _day.set('currentLog', '');
};

actions[ACTION_TYPES.RECEIVE_AUTH] = function() {
  appDispatcher.waitFor([userStore.dispatchToken]);
  _user = userStore.get();
  _day = getFreshDay();
};

module.exports = assign(new Store(actions), {
  initialize: function(dayKey) {
    _dayKey = dayKey || '';
    _day = getFreshDay();
  },

  get: function() {
    return _day;
  }
});
