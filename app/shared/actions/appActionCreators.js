/**
 * Some actions for when the app loads.
 */

'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var firebaseUtils = require('utils/firebaseUtils');
var { ACTION_TYPES } = require('constants/appConstants');

module.exports = {
  /**
   * When App component loads we'll start listening for auth status.
   */
  loadApp: function() {
    function isLoggedIn(authData) {
      console.log('logged in with data:', authData);
      appDispatcher.handleAction({
        type: ACTION_TYPES.RECEIVE_AUTH,
        auth: authData
      });
    }

    function isLoggedOut() {
      console.log('logged out');
    }

    firebaseUtils.listenToAuthStatus(isLoggedIn, isLoggedOut);
  }
};
