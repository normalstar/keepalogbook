/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var Store = require('../Store');
var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');

var UserStore = require('../User/UserStore');
var DayUtils = require('../Day/DayUtils');
var LogUtils = require('../Log/LogUtils');

var _dayKey: string = '';
var _user: ?Immutable.Map = null;

function getFreshDay(): Immutable.Map {
  return Immutable.Map({
    day: DayUtils.convertDataForDay(_dayKey, _user),
    logs: Immutable.List(),
    currentLog: ''
  });
}

var _day: Immutable.Map = getFreshDay();

function receiveAddedLog(action: {rawLog: RawLog}) {
  var converted = LogUtils.convertRawLog(action.rawLog, _day.get('day').toJS());
  _day = _day.update('logs', function(logs) {
    return logs.push(converted);
  });
}

function receiveRemovedLog(action: {rawLog: RawLog}) {
  var index = DayUtils.getLogIndexFromKey(_day, action.rawLog.key);
  if (index === -1) { return; }

  _day = _day.update('logs', function(logs) {
    return logs.remove(index);
  });
}

function receiveChangedLog(action: {rawLog: RawLog}) {
  var index = DayUtils.getLogIndexFromKey(_day, action.rawLog.key);
  if (index === -1) { return; }

  var converted = LogUtils.convertRawLog(action.rawLog, _day.get('day').toJS());

  _day = _day.updateIn(['logs', index], function() {
    return converted;
  });
}

function changeCurrentLog(action: {value: string}) {
  _day = _day.set('currentLog', action.value);
}

function submitCurrentLog() {
  _day = _day.set('currentLog', '');
}

function toggleEditLog(action: {log: Immutable.Map}) {
  var index = _day.get('logs').indexOf(action.log);
  if (index === -1) { return; }

  _day = _day.updateIn(['logs', index], function(log) {
    return log.merge({
      isEditing: !log.get('isEditing'),
      editingValue: log.get('log')
    });
  });
}

function changeEditingLog(action: {log: Immutable.Map; value: string}) {
  var index = _day.get('logs').indexOf(action.log);
  if (index === -1) { return; }

  _day = _day.updateIn(['logs', index], function(log) {
    return log.set('editingValue', action.value);
  });
}

function submitEditingLog(action: {log: Immutable.Map}) {
  var index = _day.get('logs').indexOf(action.log);
  if (index === -1) { return; }

  _day = _day.updateIn(['logs', index], function(log) {
    return log.merge({
      isEditing: !log.get('isEditing'),
      editingValue: ''
    });
  });
}

function receiveAuth() {
  Dispatcher.waitFor([UserStore.dispatchToken]);
  _user = UserStore.get();
  _day = _day.merge(getFreshDay());
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_LOG] = receiveAddedLog;
actions[ActionTypes.RECEIVE_REMOVED_LOG] = receiveRemovedLog;
actions[ActionTypes.RECEIVE_CHANGED_LOG] = receiveChangedLog;
actions[ActionTypes.CHANGE_CURRENT_LOG] = changeCurrentLog;
actions[ActionTypes.SUBMIT_CURRENT_LOG] = submitCurrentLog;
actions[ActionTypes.TOGGLE_EDIT_LOG] = toggleEditLog;
actions[ActionTypes.CHANGE_EDITING_LOG] = changeEditingLog;
actions[ActionTypes.SUBMIT_EDITING_LOG] = submitEditingLog;
actions[ActionTypes.RECEIVE_AUTH] = receiveAuth;

module.exports = assign(new Store(actions), {
  initialize(dayKey: ?string) {
    _dayKey = dayKey || '';
    _day = _day.merge(getFreshDay());
    this.emitChange();
  },

  clear() {
    _day = _day.clear();
    this.emitChange();
  },

  get(): Immutable.Map {
    return _day;
  }
});
