/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

function removeLog(log: Log): Promise {
  return firebaseUtils.remove(log.dataUrl);
}

function updateLog(log: Log, data: string): Promise {
  return firebaseUtils.set(log.dataUrl, data);
}

module.exports = {
  removeLog,
  updateLog
};
