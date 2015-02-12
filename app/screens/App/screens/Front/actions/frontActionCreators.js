'use strict';

var firebaseUtils = require('utils/firebaseUtils');

module.exports = {
  authorizeWithFacebook: function() {
    firebaseUtils.authorizeWithFacebook().then(function(authData) {
      console.log('Authenticated successfully with Facebook:', authData);
    }, function(error) {
      console.log('Login Failed!', error);
    });
  },

  authorizeWithTwitter: function() {
    firebaseUtils.authorizeWithTwitter().then(function(authData) {
      console.log('Authenticated successfully with Twitter:', authData);
    }, function(error) {
      console.log('Login Failed!', error);
    });
  }
};
