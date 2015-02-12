/**
 * Some convenience functions for firebase.
 */

'use strict';

var Firebase = require('firebase');
var firebaseUrl = __CONFIG__.firebase;

module.exports = {
  /**
   * Add trailing slash to path.
   *
   * @param {string} [path]
   * @return {FirebaseRef}
   */
  createRef: function(path) {
    return new Firebase(firebaseUrl + (path || ''));
  },

  authorizeWithFacebook: function() {
    var ref = new Firebase(firebaseUrl);
    ref.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    });
  }
};
