/**
 * Some actions for when the app loads.
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var firebaseUtils = require('../shared/firebaseUtils');

module.exports = {
  /**
   * When App component loads we'll start listening for auth status.
   */
  loadApp: function() {
    function logIn(authData) {
      Dispatcher.handleAction({
        type: ActionTypes.RECEIVE_AUTH,
        auth: authData
      });
    }

    function logOut() {
      Dispatcher.handleAction({
        type: ActionTypes.RECEIVE_LOGGED_OUT
      });
    }

    firebaseUtils.listenToAuthStatus(logIn, logOut);
  }
};
