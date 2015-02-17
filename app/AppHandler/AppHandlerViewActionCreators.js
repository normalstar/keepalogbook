/**
 * Some actions for when the app loads.
 *
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var firebaseUtils = require('../shared/firebaseUtils');

function logIn(authData?: Auth) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_AUTH,
    auth: authData || null
  });
}

function logOut() {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_LOGGED_OUT
  });
}

/**
 * When App component loads we'll start listening for auth status.
 */
function loadApp() {
  firebaseUtils.listenToAuthStatus(logIn, logOut);
}

module.exports = {
  loadApp
};
