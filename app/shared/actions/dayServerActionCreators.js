'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');

module.exports = {
  /**
   * @param {Object|string} log
   */
  receiveDayLog: function(log) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_DAY_LOG,
      log: log
    });
  }
};
