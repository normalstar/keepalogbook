/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var DayServerActionCreators = require('./DayServerActionCreators');

function listenToDay(day: Day) {
  firebaseUtils.listenToChildAdded(day.dataDataUrl, function(logSnapshot) {
    DayServerActionCreators.receiveAddedLog(logSnapshot);
  });

  firebaseUtils.listenToChildRemoved(day.dataDataUrl, function(logSnapshot) {
    DayServerActionCreators.receiveRemovedLog(logSnapshot);
  });

  firebaseUtils.listenToChildChanged(day.dataDataUrl, function(logSnapshot) {
    DayServerActionCreators.receiveChangedLog(logSnapshot);
  });
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
