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

/**
 * Make sure to add trailing slash to path.
 */
function createRef(path: ?string) {
  return new Firebase(firebaseUrl + (path || ''));
}

function authorizeWithFacebook(): Promise {
  return createAuthWithPopupPromise('facebook');
}

function authorizeWithTwitter(): Promise {
  return createAuthWithPopupPromise('twitter');
}

function unauth() {
  var ref = new Firebase(firebaseUrl);
  ref.unauth();
}

function listenToAuthStatus(loggedInCallback: any, loggedOutCallback: any) {
  var ref = new Firebase(firebaseUrl);
  ref.onAuth(function(authData) {
    if (authData) {
      loggedInCallback(authData);
    } else {
      loggedOutCallback();
    }
  });
}

// Receive data

function listenToValue(path: string, callback: any) {
  var ref = new Firebase(firebaseUrl + path);

  ref.on('value', function(snapshot) {
    callback({key: snapshot.key(), value: snapshot.val()});
  });
}

function stopListeningToValue(path: string) {
  var ref = new Firebase(firebaseUrl + path);
  ref.off('value');
}

function listenToChildAdded(path: string, callback: Function) {
  var ref = new Firebase(firebaseUrl + path);

  ref.on('child_added', function(snapshot) {
    callback({key: snapshot.key(), value: snapshot.val()});
  });
}

function stopListeningToChildAdded(path: string) {
  var ref = new Firebase(firebaseUrl + path);
  ref.off('child_added');
}

// Write data

// set() is in the object declaration.

function update(path: string, value: Object|string): Promise {
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
}

function remove(path: string): Promise {
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
}

function push(path: string, value: Object|string): Promise {
  var ref = new Firebase(firebaseUrl + path);
  ref.push(value);
  return ref.key();
}

module.exports = {
  createRef,
  authorizeWithFacebook,
  authorizeWithTwitter,
  unauth,
  listenToAuthStatus,

  listenToValue,
  stopListeningToValue,
  listenToChildAdded,
  stopListeningToChildAdded,

  /**
   * @todo Change this function name
   */
  set(path: string, value: Object|string): Promise {
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

  update,
  remove,
  push
};
