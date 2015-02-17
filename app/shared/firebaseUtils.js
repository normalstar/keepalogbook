/**
 * Some convenience functions for firebase.
 *
 * @flow
 */

'use strict';

var Firebase = require('firebase');
var firebaseUrl = __FIREBASE__;
var RSVP = require('rsvp');

function createAuthWithPopupPromise(type: string): Promise {
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
  createRef: function(path: ?string) {
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
  listenToAuthStatus: function(loggedInCallback: any, loggedOutCallback: any) {
    var ref = new Firebase(firebaseUrl);
    ref.onAuth(function(authData) {
      if (authData) {
        loggedInCallback(authData);
      } else {
        loggedOutCallback();
      }
    });
  },

  // Receive data

  /**
   * @param {string} path
   * @param {Function} callback
   */
  listenToValue: function(path: string, callback: any) {
    var ref = new Firebase(firebaseUrl + path);

    ref.on('value', function(snapshot) {
      callback({key: snapshot.key(), value: snapshot.val()});
    });
  },

  /**
   * @param {string} path
   */
  stopListeningToValue: function(path: string) {
    var ref = new Firebase(firebaseUrl + path);
    ref.off('value');
  },

  /**
   * @param {string} path
   * @param {Function} callback
   */
  listenToChildAdded: function(path: string, callback: Function) {
    var ref = new Firebase(firebaseUrl + path);

    ref.on('child_added', function(snapshot) {
      callback({key: snapshot.key(), value: snapshot.val()});
    });
  },

  /**
   * @param {string} path
   */
  stopListeningToChildAdded: function(path: string) {
    var ref = new Firebase(firebaseUrl + path);
    ref.off('child_added');
  },

  // Write data

  /**
   * @param {string} path
   * @param {Object} value
   * @return {Promise}
   */
  set: function(path: string, value: Object) {
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
  update: function(path: string, value: Object) {
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
   * @return {Promise}
   */
  remove: function(path: string) {
    var ref = new Firebase(firebaseUrl + path);

    var promise = new RSVP.Promise(function(resolve, reject) {
      ref.remove(function(error) {
        if (error) {
          reject();
        } else {
          resolve();
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
  push: function(path: string, value: Object|string) {
    var ref = new Firebase(firebaseUrl + path);
    ref.push(value);
    return ref.key();
  }
};
