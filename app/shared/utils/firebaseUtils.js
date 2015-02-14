/**
 * Some convenience functions for firebase.
 */

'use strict';

var Firebase = require('firebase');
var firebaseUrl = __FIREBASE__;
var RSVP = require('rsvp');

function createAuthWithPopupPromise(type) {
  var ref = new Firebase(firebaseUrl);
  var promise = new RSVP.Promise(function(resolve, reject) {
    ref.authWithOAuthPopup(type, function(error, authData) {
      if (error) {
        reject(error);
      } else {
        resolve(authData);
      }
    });
  });

  return promise;
}

module.exports = {
  /**
   * Make sure to add trailing slash to path.
   *
   * @param {string} [path]
   * @return {FirebaseRef}
   */
  createRef: function(path) {
    return new Firebase(firebaseUrl + (path || ''));
  },

  /**
   * @return {Promise}
   */
  authorizeWithFacebook: function() {
    return createAuthWithPopupPromise('facebook');
  },

  /**
   * @return {Promise}
   */
  authorizeWithTwitter: function() {
    return createAuthWithPopupPromise('twitter');
  },

  unauth: function() {
    var ref = new Firebase(firebaseUrl);
    ref.unauth();
  },

  /**
   * listenToAuthStatus
   *
   * @param {Function} loggedInCallback
   * @param {Function} loggedOutCallback
   */
  listenToAuthStatus: function(loggedInCallback, loggedOutCallback) {
    var ref = new Firebase(firebaseUrl);
    ref.onAuth(function(authData) {
      if (authData) {
        loggedInCallback(authData);
      } else {
        loggedOutCallback();
      }
    });
  },

  /**
   * Check value from ref once.
   *
   * @param path
   * @return {Promise}
   */
  getValue: function(path) {
    var ref = new Firebase(firebaseUrl + path);

    var promise = new RSVP.Promise(function(resolve, reject) {
      ref.once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function(error) {
        reject(error);
      });
    });

    return promise;
  },

  /**
   * @param {string} path
   * @param {Function} callback
   */
  listenChildAdded: function(path, callback) {
    var ref = new Firebase(firebaseUrl + path);

    ref.on('child_added', function(snapshot) {
      callback(snapshot.val());
    });
  },

  /**
   * @param {string} path
   * @param {Object} value
   * @return {Promise}
   */
  set: function(path, value) {
    var ref = new Firebase(firebaseUrl + path);

    var promise = new RSVP.Promise(function(resolve, reject) {
      ref.set(value, function(error) {
        if (error) {
          reject();
        } else {
          resolve(value);
        }
      });
    });

    return promise;
  },

  /**
   * @param {string} path
   * @param {Object} value
   * @return {Promise}
   */
  update: function(path, value) {
    var ref = new Firebase(firebaseUrl + path);

    var promise = new RSVP.Promise(function(resolve, reject) {
      ref.update(value, function(error) {
        if (error) {
          reject();
        } else {
          resolve(value);
        }
      });
    });

    return promise;
  },

  /**
   * @param {string} path
   * @param {Object|string} value
   * @return {string} - Key of pushed id
   */
  push: function(path, value) {
    var ref = new Firebase(firebaseUrl + path);
    ref.push(value);
    return ref.key();
  }
};
