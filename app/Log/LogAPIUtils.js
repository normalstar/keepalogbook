/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

function removeLog(log: Log, day: Day, currentCount: number): Promise {
  return firebaseUtils.update(day.daysDataUrl, {count: currentCount - 1}).then(function() {
    return firebaseUtils.remove(log.dataUrl);
  });
}

function updateLog(log: Log, data: string): Promise {
  return firebaseUtils.set(log.dataUrl, data);
}

module.exports = {
  removeLog,
  updateLog
};
