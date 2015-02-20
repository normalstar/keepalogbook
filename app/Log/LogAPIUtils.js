/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

function removeLog(log: Log, day: Day, currentCount: number): Promise {
  return firebaseUtils.remove(log.dataUrl).then(function() {
    if (currentCount === 1) {
      return firebaseUtils.remove(day.daysDataUrl);
    } else {
      return firebaseUtils.update(day.daysDataUrl, {count: currentCount - 1});
    }
  });
}

function updateLog(log: Log, data: string): Promise {
  return firebaseUtils.set(log.dataUrl, data);
}

module.exports = {
  removeLog,
  updateLog
};
