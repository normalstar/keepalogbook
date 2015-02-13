'use strict';

var { ACTION_TYPES } = require('constants/appConstants');
var appDispatcher = require('dispatchers/appDispatcher');
var firebaseUtils = require('utils/firebaseUtils');
var usersDao = require('daos/usersDao');

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
  },

  /**
   * First we'll check if userid exists. If not, we'll send them to choose
   * username screen. Otherwise we'll redirect them to the user screen.
   */
  redirectBecauseAuthenticated: function(uid) {
    usersDao.getUsernameWithUid(uid).then(function(username) {
        console.log('redirect to user page');
        appDispatcher.handleAction({
          type: ACTION_TYPES.RECEIVE_HAS_USERNAME,
          username: username
        });
    }, function() {
        console.log('redirect to choose username page');
        appDispatcher.handleAction({
          type: ACTION_TYPES.RECEIVE_HAS_NO_USERNAME
        });
    });
  }
};
