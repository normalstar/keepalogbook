/**
 * @flow
 */

'use strict';

var UserAPIUtils = require('./UserAPIUtils');

function listenToUserMeta(user: User, auth: Auth): Promise {
  return UserAPIUtils.listenToUserMeta(user, auth);
}

function stopListeningToUserMeta(user: User): Promise {
  return UserAPIUtils.stopListeningToUserMeta(user);
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta
};
