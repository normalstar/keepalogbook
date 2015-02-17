/**
 * @flow
 */

'use strict';

var LogAPIUtils = require('./LogAPIUtils');
var LogUtils = require('./LogUtils');
var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

function removeLog(log: Log): Promise {
  return LogAPIUtils.removeLog(log);
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

function submitCurrentLog(log: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.SUBMIT_EDITING_LOG,
    log
  });

  var dataToSave = LogUtils.convertLogToSave(log);
  return LogAPIUtils.updateLog(log.toJS(), dataToSave);
}

module.exports = {
  removeLog,
  toggleEditLog,
  changeEditingLog,
  submitCurrentLog
};
