/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var DayAPIUtils = require('./DayAPIUtils');

function listenToDay(day: Object) {
  DayAPIUtils.listenToDay(day.toJS());
}

function stopListeningToDay(day: Object) {
  DayAPIUtils.stopListeningToDay(day.toJS());
}

function changeCurrentLog(value: string) {
  Dispatcher.handleAction({
    type: ActionTypes.CHANGE_CURRENT_LOG,
    value
  });
}

function submitCurrentLog(day: Object, data: string, currentCount: number): Promise {
  Dispatcher.handleAction({
    type: ActionTypes.SUBMIT_CURRENT_LOG
  });

  var dataToSave = {
    log: data,
    ts: new Date().getTime()
  };

  return DayAPIUtils.createLog(day.toJS(), dataToSave, currentCount);
}

module.exports = {
  listenToDay,
  stopListeningToDay,
  changeCurrentLog,
  submitCurrentLog
};
