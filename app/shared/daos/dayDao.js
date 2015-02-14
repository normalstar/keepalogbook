'use strict';

var firebaseUtils = require('utils/firebaseUtils');
var dayActionCreators = require('actions/dayActionCreators');

module.exports = {
  /**
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   */
  getDay: function(dayKey, user) {
    firebaseUtils.listenChildAdded(user.dataUrl + '/data/' + dayKey, function(log) {
      dayActionCreators.receiveDayLog(log);
    });
  },

  /**
   * First add to user > data > dayKey. Then update count in user > day >
   * dayKey. If neither exist create them.
   *
   * @param {string} dayKey
   * @param {Object} user
   * @param {string} user.dataUrl
   * @return {Promise}
   */
  createLog: function(dayKey, user, data) {
    var dayUrl = user.dataUrl + '/days/' + dayKey;

    firebaseUtils.push(user.dataUrl + '/data/' + dayKey, data);

    return firebaseUtils.getValue(dayUrl, function(value) {
      if (!value) {
        // Create
        return firebaseUtils.set(dayUrl, {count: 0});
      } else {
        // Update
        var updatedCount = value.count + 1;
        return firebaseUtils.update(dayUrl, {count: updatedCount});
      }
    });
  }
};
