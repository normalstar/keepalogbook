'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');

module.exports = {
  /**
   * @param {Object|string} log
   */
  receiveDayLog: function(rawLog) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_DAY_LOG,
      rawLog: rawLog
    });
  }
};
