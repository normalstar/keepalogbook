'use strict';

var Immutable = require('immutable');

module.exports = {
  /**
   * convertRawLog
   *
   * @param {Object} rawLog
   * @param {string} rawLog.key
   * @param {string} rawLog.value
   * @return {Object}
   */
  convertRawLog: function(rawLog) {
    return Immutable.Map(rawLog);
  }
};
