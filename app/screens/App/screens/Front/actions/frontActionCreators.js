'use strict';

var firebaseUtils = require('utils/firebaseUtils');
var userDao = require('daos/userDao');

module.exports = {
  authorizeWithFacebook: function() {
    firebaseUtils.authorizeWithFacebook().then(function(authData) {
      console.log('Successful Facebook auth:', authData);
    }, function(error) {
      console.log('Failed Facebook auth:', error);
    });
  },

  authorizeWithTwitter: function() {
    firebaseUtils.authorizeWithTwitter().then(function(authData) {
      console.log('Successful Twitter auth:', authData);
    }, function(error) {
      console.log('Failed Twitter auth:', error);
    });
  },

  logOut: function() {
    firebaseUtils.unauth();
  },

  createUser: function(user, auth) {
    return userDao.createUser(user, auth);
  },

  getUserMeta: function(user) {
    return userDao.getUserMeta(user);
  }
};
