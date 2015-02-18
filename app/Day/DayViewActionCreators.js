/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var DayAPIUtils = require('./DayAPIUtils');

function transitionToDay(day: Object) {
  Dispatcher.handleAction({
    type: ActionTypes.TRANSITION_TO_DAY
  });

  DayAPIUtils.listenToDay(day.toJS());
}

function transitionFromDay(day: Object) {
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
  transitionToDay,
  transitionFromDay,
  changeCurrentLog,
  submitCurrentLog
};
