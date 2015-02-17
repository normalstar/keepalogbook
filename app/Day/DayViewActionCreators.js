'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var DayAPIUtils = require('./DayAPIUtils');

module.exports = {
  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  listenToDay: function(day) {
    DayAPIUtils.listenToDay(day);
  },

  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  stopListeningToDay: function(day) {
    DayAPIUtils.stopListeningToDay(day);
  },

  /**
   * @param {string} value
   */
  changeCurrentLog: function(value) {
    Dispatcher.handleAction({
      type: ActionTypes.CHANGE_CURRENT_LOG,
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
    Dispatcher.handleAction({
      type: ActionTypes.SUBMIT_CURRENT_LOG
    });

    return DayAPIUtils.createLog(day, data, currentCount);
  }
};
