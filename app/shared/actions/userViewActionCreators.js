'use strict';

var userDao = require('daos/userDao');

module.exports = {
  listenToUserMeta: function(user, auth) {
    return userDao.listenToUserMeta(user, auth);
  },

  stopListeningToUserMeta: function(user) {
    return userDao.stopListeningToUserMeta(user);
  }
};
