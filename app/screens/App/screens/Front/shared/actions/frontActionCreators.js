'use strict';

var firebaseUtils = require('utils/firebaseUtils');

module.exports = {
  authorizeWithFacebook: function() {
    firebaseUtils.authorizeWithFacebook().then(function(authData) {
      console.log('Authenticated successfully with payload:', authData);
    }, function(error) {
      console.log('Login Failed!', error);
    });
  }
};
