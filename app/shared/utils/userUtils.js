'use strict';

var assign = require('lodash/object/assign');

/**
 * Make unique id prettier
 *
 * @param {string} uid
 * @return {string}
 */
function getUserIdFromUid(uid) {
  var unuglified = uid.split(':');
  if (unuglified.length === 1) { return uid; }
  return unuglified[1] + unuglified[0].charAt(0);
}

/**
 * Facebook and Twitter give us display name
 *
 * @param {Object} auth
 * @param {string} auth.provider
 * @param {?Object} auth.facebook
 * @param {string} auth.facebook.displayName
 * @param {?Object} auth.twitter
 * @param {string} auth.twitter.displayName
 * @return {string}
 */
function getDisplayNameFromAuth(auth) {
  return auth[auth.provider].displayName || '';
}

module.exports = {
  getUserFromRawAuth: function(rawAuth) {
    var userId = getUserIdFromUid(rawAuth.uid);

    return assign({
      dataUrl: '/' + userId,
      userId: userId
    }, rawAuth);
  },

  getNewUserData: function(user, auth) {
    return {
      meta: {
        share: false,
        active: true,
        displayName: getDisplayNameFromAuth(auth)
      }
    };
  }
};
