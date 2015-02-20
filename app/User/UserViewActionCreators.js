/**
 * @flow
 */

'use strict';

var UserAPIUtils = require('./UserAPIUtils');

function listenToUserMeta(user: Object, auth: Object) {
  return UserAPIUtils.listenToUserMeta(user.toJS(), auth.toJS());
}

function stopListeningToUserMeta(user: Object) {
  return UserAPIUtils.stopListeningToUserMeta(user.toJS());
}

function listenToCalendar(user: Object) {
  return UserAPIUtils.listenToCalendar(user.toJS());
}

function stopListeningToCalendar(user: Object) {
  return UserAPIUtils.stopListeningToCalendar(user.toJS());
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta,
  listenToCalendar,
  stopListeningToCalendar
};
