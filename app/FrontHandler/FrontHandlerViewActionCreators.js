/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

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
  }
};
