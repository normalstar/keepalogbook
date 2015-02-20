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
    logs: Immutable.Map(),
    currentLog: ''
  });
}

var _day: Immutable.Map = getFreshDay();

function receiveAddedLog(action: {rawLog: RawLog}) {
  var converted = LogUtils.convertRawLog(action.rawLog, _day.get('day').toJS());
  _day = _day.setIn(['logs', action.rawLog.key], converted);
}

function receiveRemovedLog(action: {rawLog: RawLog}) {
  _day = _day.deleteIn(['logs', action.rawLog.key]);
}

function changeCurrentLog(action: {value: string}) {
  _day = _day.set('currentLog', action.value);
}

function submitCurrentLog() {
  _day = _day.set('currentLog', '');
}

function toggleViewLogOptions(action: {log: Immutable.Map}) {
  _day = _day.updateIn(['logs', action.log.get('key')], function(log) {
    return log.merge({
      isViewingOptions: !log.get('isViewingOptions')
    });
  });
}

function toggleConfirmRemoveLog(action: {log: Immutable.Map}) {
  _day = _day.updateIn(['logs', action.log.get('key')], function(log) {
    return log.merge({
      isConfirmingRemove: !log.get('isConfirmingRemove')
    });
  });
}

function toggleEditLog(action: {log: Immutable.Map}) {
  _day = _day.updateIn(['logs', action.log.get('key')], function(log) {
    return log.merge({
      isViewingOptions: false,
      isEditing: !log.get('isEditing'),
      editingValue: log.get('log')
    });
  });
}

function changeEditingLog(action: {log: Immutable.Map; value: string}) {
  _day = _day.updateIn(['logs', action.log.get('key')], function(log) {
    return log.set('editingValue', action.value);
  });
}

function submitEditingLog(action: {log: Immutable.Map}) {
  _day = _day.updateIn(['logs', action.log.get('key')], function(log) {
    return log.merge({
      isEditing: !log.get('isEditing'),
      editingValue: ''
    });
  });
}

function receiveAuth() {
  Dispatcher.waitFor([UserStore.dispatchToken]);
  _user = UserStore.get();
  _day = getFreshDay();
}

function receiveLoggedOut() {
  _user = null;
  _day = getFreshDay();
}

var actions = {};
actions[ActionTypes.RECEIVE_ADDED_LOG] = receiveAddedLog;
actions[ActionTypes.RECEIVE_REMOVED_LOG] = receiveRemovedLog;
actions[ActionTypes.RECEIVE_CHANGED_LOG] = receiveAddedLog;
actions[ActionTypes.CHANGE_CURRENT_LOG] = changeCurrentLog;
actions[ActionTypes.SUBMIT_CURRENT_LOG] = submitCurrentLog;
actions[ActionTypes.TOGGLE_VIEW_LOG_OPTIONS] = toggleViewLogOptions;
actions[ActionTypes.TOGGLE_CONFIRM_REMOVE_LOG] = toggleConfirmRemoveLog;
actions[ActionTypes.TOGGLE_EDIT_LOG] = toggleEditLog;
actions[ActionTypes.CHANGE_EDITING_LOG] = changeEditingLog;
actions[ActionTypes.SUBMIT_EDITING_LOG] = submitEditingLog;
actions[ActionTypes.TRANSITION_TO_DAY] = function() {}; // So will emit change. Gross.
actions[ActionTypes.RECEIVE_AUTH] = receiveAuth;
actions[ActionTypes.RECEIVE_LOGGED_OUT] = receiveLoggedOut;

module.exports = assign(new Store(actions), {
  initialize(dayKey: ?string) {
    _dayKey = dayKey || '';
    _day = getFreshDay();
  },

  get(): Immutable.Map {
    return _day;
  }
});
