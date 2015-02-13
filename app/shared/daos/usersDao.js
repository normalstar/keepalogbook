/**
 * Work with groups of users. Mainly for authentication.
 */

'use strict';

var firebaseUtils = require('utils/firebaseUtils');

module.exports = {
  /**
   * @param {string} uid
   * @return {Promise}
   */
  getUsernameWithUid: function(uid) {
    return firebaseUtils.getValue('/uids/' + uid);
  },

  createUsernameWithUid: function(uid, username) {
    return firebaseUtils.set('/uids/' + uid, username);
  }
};
