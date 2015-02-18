/**
 * @flow
 */

'use strict';

var LogAPIUtils = require('./LogAPIUtils');
var LogUtils = require('./LogUtils');
var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

function removeLog(log: Object): Promise {
  return LogAPIUtils.removeLog(log.toJS());
}

function toggleViewLogOptions(log: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.TOGGLE_VIEW_LOG_OPTIONS,
    log
  });
}

function toggleConfirmRemoveLog(log: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.TOGGLE_CONFIRM_REMOVE_LOG,
    log
  });
}

function toggleEditLog(log: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.TOGGLE_EDIT_LOG,
    log
  });
}

function changeEditingLog(log: Object, value: string) {
  Dispatcher.handleAction({
    type: ActionTypes.CHANGE_EDITING_LOG,
    log,
    value
  });
}

function submitEditingLog(log: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.SUBMIT_EDITING_LOG,
    log
  });

  var dataToSave = LogUtils.convertLogToSave(log);
  return LogAPIUtils.updateLog(log.toJS(), dataToSave);
}

module.exports = {
  removeLog,
  toggleViewLogOptions,
  toggleConfirmRemoveLog,
  toggleEditLog,
  changeEditingLog,
  submitEditingLog
};
