'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var UserAPIUtils = require('../User/UserAPIUtils');

module.exports = {
  authorizeWithFacebook: function() {
    firebaseUtils.authorizeWithFacebook().then(function(authData) {
      if (__DEV__) {
        console.log('Successful Facebook auth:', authData);
      }
    }, function(error) {
      if (__DEV__) {
        console.log('Failed Facebook auth:', error);
      }
    });
  },

  authorizeWithTwitter: function() {
    firebaseUtils.authorizeWithTwitter().then(function(authData) {
      if (__DEV__) {
        console.log('Successful Twitter auth:', authData);
      }
    }, function(error) {
      if (__DEV__) {
        console.log('Failed Twitter auth:', error);
      }
    });
  },

  logOut: function() {
    firebaseUtils.unauth();
  },

  createUser: function(user, auth) {
    return UserAPIUtils.createUser(user, auth);
  },

  getUserMeta: function(user) {
    return UserAPIUtils.getUserMeta(user);
  }
};
