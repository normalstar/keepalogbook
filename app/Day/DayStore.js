/**
 * @flow
 */

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

function receiveAddedLog(action: {rawLog: RawLog}) {
  var converted = LogUtils.convertRawLog(action.rawLog);
  _day = _day.update('logs', function(logs) {
    return logs.push(converted);
  });
}

function changeCurrentLog(action: {value: string}) {
  _day = _day.set('currentLog', action.value);
}

function submitCurrentLog() {
  _day = _day.set('currentLog', '');
}

function receiveAuth() {
  Dispatcher.waitFor([UserStore.dispatchToken]);
  _user = UserStore.get();
  _day = getFreshDay();
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_LOG] = receiveAddedLog;
actions[ActionTypes.CHANGE_CURRENT_LOG] = changeCurrentLog;
actions[ActionTypes.SUBMIT_CURRENT_LOG] = submitCurrentLog;
actions[ActionTypes.RECEIVE_AUTH] = receiveAuth;

module.exports = assign(new Store(actions), {
  initialize(dayKey: ?string) {
    _dayKey = dayKey || '';
    _day = getFreshDay();
  },

  get() {
    return _day;
  }
});
