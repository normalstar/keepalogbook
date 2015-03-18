/**
 * @flow
 */

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var DayAPIUtils = require('./DayAPIUtils');

function transitionToDay(dayKey: string) {
  Dispatcher.handleAction({
    type: ActionTypes.TRANSITION_TO_DAY,
    dayKey
  });
}

function loadDay(day: Object) {
  DayAPIUtils.listenToDay(day.toJS());
}

function unloadDay(day: Object) {
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

function toggleCalendar() {
  Dispatcher.handleAction({
    type: ActionTypes.TOGGLE_CALENDAR
  });
}

module.exports = {
  transitionToDay,
  loadDay,
  unloadDay,
  changeCurrentLog,
  submitCurrentLog,
  toggleCalendar
};
