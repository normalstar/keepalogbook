'use strict';

var userDao = require('daos/dayDao');

module.exports = {
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
