'use strict';

var firebaseUtils = require('utils/firebaseUtils');
var userActionCreators = require('actions/userActionCreators');
var userUtils = require('utils/userUtils');

module.exports = {
  createUser: function(user, auth) {
    var data = userUtils.getNewUserData(user, auth);
    return firebaseUtils.set(user.dataUrl, data).then(function() {
      userActionCreators.receiveCreateNewUserSuccess(data);
    });
  },

  getUserMeta: function(user) {
    return firebaseUtils.getValue(user.dataUrl + '/meta').then(function(meta) {
      if (meta) {
        userActionCreators.receiveUserMeta(meta);
      } else {
        userActionCreators.receiveUserDoesntExist();
      }
    });
  }
};
