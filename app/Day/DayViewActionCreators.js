/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var DayAPIUtils = require('./DayAPIUtils');

function listenToDay(day: Day) {
  DayAPIUtils.listenToDay(day);
}

function stopListeningToDay(day: Day) {
  DayAPIUtils.stopListeningToDay(day);
}

function changeCurrentLog(value: string) {
  Dispatcher.handleAction({
    type: ActionTypes.CHANGE_CURRENT_LOG,
    value: value
  });
}

function submitCurrentLog(day: Day, data: string, currentCount: number): Promise {
  Dispatcher.handleAction({
    type: ActionTypes.SUBMIT_CURRENT_LOG
  });

  return DayAPIUtils.createLog(day, data, currentCount);
}

module.exports = {
  listenToDay,
  stopListeningToDay,
  changeCurrentLog,
  submitCurrentLog
};
