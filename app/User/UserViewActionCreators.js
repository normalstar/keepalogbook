/**
 * @flow
 */

'use strict';

var UserAPIUtils = require('./UserAPIUtils');

function listenToUserMeta(user: User, auth: Auth) {
  return UserAPIUtils.listenToUserMeta(user, auth);
}

function stopListeningToUserMeta(user: User) {
  return UserAPIUtils.stopListeningToUserMeta(user);
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta
};
