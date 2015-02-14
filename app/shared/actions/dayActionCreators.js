'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');
var userDao = require('daos/dayDao');

module.exports = {
  /**
   * @param {Object|string} log
   */
  receiveDayLog: function(log) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_DAY_LOG,
      log: log
    });
  },

  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   * @param {Object|string} data
   */
  createLog: function(dayKey, user, data) {
    userDao.createLog(dayKey, user, data);
  }
};
