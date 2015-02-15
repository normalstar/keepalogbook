'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');
var dayDao = require('daos/dayDao');

module.exports = {
  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   * @param {Object|string} data
   */
  createLog: function(dayKey, user, data) {
    dayDao.createLog(dayKey, user, data);
  },

  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   * @param {Object|string} data
   */
  listenToDay: function(dayKey, user) {
    dayDao.listenToDay(dayKey, user);
  },

  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   * @param {Object|string} data
   */
  stopListeningToDay: function(dayKey, user) {
    dayDao.stopListeningToDay(dayKey, user);
  },

  /**
   * @param {string} value
   */
  changeCurrentLog: function(value) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.CHANGE_CURRENT_LOG,
      value: value
    });
  },

  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} data
   * @param {number} currentCount - Count *before* adding this new one
   * @return {Promise}
   */
  submitCurrentLog: function(dayKey, user, data, currentCount) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.SUBMIT_CURRENT_LOG
    });

    return dayDao.createLog(dayKey, user, data, currentCount);
  }
};
