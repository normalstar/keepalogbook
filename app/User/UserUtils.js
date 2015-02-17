/**
 * @flow
 */

'use strict';

/**
 * Make unique id prettier
 */
function getUserIdFromUid(uid: string): string {
  var unuglified = uid.split(':');
  if (unuglified.length === 1) { return uid; }
  return unuglified[1] + unuglified[0].charAt(0);
}

/**
 * Facebook and Twitter give us display name
 */
function getDisplayNameFromAuth(auth: Auth): string {
  return auth[auth.provider].displayName || '';
}

module.exports = {
  getUserFromRawAuth: function(rawAuth: Auth): User {
    var userId = getUserIdFromUid(rawAuth.uid);

    return {
      dataUrl: '/' + userId,
      userId: userId,
      meta: null
    };
  },

  getNewUserData: function(user: User, auth: Auth): {meta: UserMeta} {
    return {
      meta: {
        share: false,
        active: true,
        displayName: getDisplayNameFromAuth(auth)
      }
    };
  }
};
