'use strict';

var UserAPIUtils = require('./UserAPIUtils');

module.exports = {
  listenToUserMeta: function(user, auth) {
    return UserAPIUtils.listenToUserMeta(user, auth);
  },

  stopListeningToUserMeta: function(user) {
    return UserAPIUtils.stopListeningToUserMeta(user);
  }
};
