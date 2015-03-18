/**
 * @flow
 */

var firebaseUtils = require('../shared/firebaseUtils');
var DayServerActionCreators = require('./DayServerActionCreators');

function listenToDay(day: Day) {
  firebaseUtils.listenToChildAdded(day.dataDataUrl, DayServerActionCreators.receiveAddedLog);
  firebaseUtils.listenToChildRemoved(day.dataDataUrl, DayServerActionCreators.receiveRemovedLog);
  firebaseUtils.listenToChildChanged(day.dataDataUrl, DayServerActionCreators.receiveChangedLog);
}

function stopListeningToDay(day: Day) {
  firebaseUtils.stopListeningToChildren(day.dataDataUrl);
}

/**
 * First add to user > data > dayKey. Then update count in user > day >
 * dayKey. If neither exist create them.
 */
function createLog(day: Day, data: LogToSave, currentCount: number): Promise {
  firebaseUtils.push(day.dataDataUrl, data);
  return firebaseUtils.update(day.daysDataUrl, {count: currentCount + 1});
}

module.exports = {
  listenToDay,
  stopListeningToDay,
  createLog
};
