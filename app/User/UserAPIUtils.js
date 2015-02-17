'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var UserServerActionCreators = require('./UserServerActionCreators');
var UserUtils = require('./UserUtils');

module.exports = {
  listenToUserMeta: function(user, auth) {
    return firebaseUtils.listenToValue(user.dataUrl + '/meta', function(metaSnapshot) {
      if (metaSnapshot.value !== null) {
        UserServerActionCreators.receiveUserMeta(metaSnapshot.value);
      } else {
        // Create new user
        var data = UserUtils.getNewUserData(user, auth);
        return firebaseUtils.set(user.dataUrl, data);
      }
    });
  },

  stopListeningToUserMeta: function(user) {
    return firebaseUtils.stopListeningToValue(user.dataUrl + '/meta');
  }
};
