/**
 * @flow
 */

var firebaseUtils = require('../shared/firebaseUtils');
var UserServerActionCreators = require('./UserServerActionCreators');
var UserUtils = require('./UserUtils');

function listenToUserMeta(user: User, auth: Auth) {
  return firebaseUtils.listenToValue(user.dataUrl + '/meta', function(metaSnapshot?) {
    if (metaSnapshot && metaSnapshot.value !== null) {
      UserServerActionCreators.receiveUserMeta(metaSnapshot.value);
    } else {
      // Create new user
      var data = UserUtils.getNewUserData(user, auth);
      return firebaseUtils.set(user.dataUrl, data);
    }
  });
}

function stopListeningToUserMeta(user: User) {
  return firebaseUtils.stopListeningToValue(user.dataUrl + '/meta');
}

function listenToCalendar(user: User) {
  var daysUrl = user.dataUrl + '/days';
  firebaseUtils.listenToChildAdded(daysUrl, UserServerActionCreators.receiveAddedDay);
  firebaseUtils.listenToChildRemoved(daysUrl, UserServerActionCreators.receiveRemovedDay);
  firebaseUtils.listenToChildChanged(daysUrl, UserServerActionCreators.receiveChangedDay);
}

function stopListeningToCalendar(user: User) {
  firebaseUtils.stopListeningToChildren(user.dataUrl + '/days');
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta,
  listenToCalendar,
  stopListeningToCalendar
};
