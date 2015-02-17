'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var DayServerActionCreators = require('./DayServerActionCreators');

module.exports = {
  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  listenToDay: function(day) {
    firebaseUtils.listenToChildAdded(day.dataDataUrl, function(logSnapshot) {
      DayServerActionCreators.receiveAddedLog(logSnapshot);
    });
  },

  /**
   * @param {Object} day
   * @param {string} day.dataDataUrl
   */
  stopListeningToDay: function(day) {
    firebaseUtils.stopListeningToChildAdded(day.dataDataUrl);
  },

  /**
   * First add to user > data > dayKey. Then update count in user > day >
   * dayKey. If neither exist create them.
   *
   * @param {Object} day
   * @param {string} day.dataDataUrl
   * @param {string} day.daysDataUrl
   * @param {string} data
   * @param {number} currentCount
   * @return {Promise}
   */
  createLog: function(day, data, currentCount) {
    firebaseUtils.push(day.dataDataUrl, data);
    return firebaseUtils.update(day.daysDataUrl, {count: currentCount + 1});
  }
};
