'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var LogUtils = require('../Log/LogUtils');
var Store = require('../Store');
var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');

var UserStore = require('../User/UserStore');
var DayUtils = require('../Day/DayUtils');

var _dayKey = '';
var _user = null;

function getFreshDay() {
  return Immutable.Map({
    day: DayUtils.convertDataForDay(_dayKey, _user),
    logs: Immutable.List(),
    currentLog: ''
  });
}

var _day = getFreshDay();

var actions = {};

actions[ActionTypes.RECEIVE_ADDED_LOG] = function(action) {
  var converted = LogUtils.convertRawLog(action.rawLog);
  _day = _day.update('logs', function(logs) {
    return logs.push(converted);
  });
};

actions[ActionTypes.CHANGE_CURRENT_LOG] = function(action) {
  _day = _day.set('currentLog', action.value);
};

actions[ActionTypes.SUBMIT_CURRENT_LOG] = function() {
  _day = _day.set('currentLog', '');
};

actions[ActionTypes.RECEIVE_AUTH] = function() {
  Dispatcher.waitFor([UserStore.dispatchToken]);
  _user = UserStore.get();
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
