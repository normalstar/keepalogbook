/**
 * Some convenience functions for firebase.
 */

'use strict';

var Firebase = require('firebase');
var firebaseUrl = __FIREBASE__;
var RSVP = require('rsvp');

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
    var promise = new RSVP.Promise(function(resolve, reject) {
      ref.authWithOAuthPopup('facebook', function(error, authData) {
        if (error) {
          reject(error);
        } else {
          resolve(authData);
        }
      });
    });

    return promise;
  }
};
