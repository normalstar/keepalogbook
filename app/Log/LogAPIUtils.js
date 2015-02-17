/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

function removeLog(log: Log): Promise {
  return firebaseUtils.remove(log.dataUrl);
}

module.exports = {
  removeLog
};
