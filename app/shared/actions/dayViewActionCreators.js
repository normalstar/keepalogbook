'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');
var dayDao = require('daos/dayDao');

module.exports = {
  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  listenToDay: function(day) {
    dayDao.listenToDay(day);
  },

  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  stopListeningToDay: function(day) {
    dayDao.stopListeningToDay(day);
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
   * @param {Object} day
   * @param {string} day.dataDataUrl
   * @param {string} day.daysDataUrl
   * @param {string} data
   * @param {number} currentCount - Count *before* adding this new one
   * @return {Promise}
   */
  submitCurrentLog: function(day, data, currentCount) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.SUBMIT_CURRENT_LOG
    });

    return dayDao.createLog(day, data, currentCount);
  }
};
