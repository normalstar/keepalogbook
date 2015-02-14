'use strict';

var firebaseUtils = require('utils/firebaseUtils');
var userServerActionCreators = require('actions/userServerActionCreators');
var userUtils = require('utils/userUtils');

module.exports = {
  listenToUserMeta: function(user, auth) {
    return firebaseUtils.listenToValue(user.dataUrl + '/meta', function(meta) {
      if (meta) {
        userServerActionCreators.receiveUserMeta(meta);
      } else {
        // Create new user
        var data = userUtils.getNewUserData(user, auth);
        return firebaseUtils.set(user.dataUrl, data).then(function() {
          userServerActionCreators.receiveCreateNewUserSuccess(data);
        });
      }
    });
  },

  stopListeningToUserMeta: function(user) {
    return firebaseUtils.stopListeningToValue(user.dataUrl + '/meta');
  }
};
