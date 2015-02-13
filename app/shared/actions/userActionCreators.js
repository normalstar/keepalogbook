'use strict';

var { ACTION_TYPES } = require('constants/appConstants');
var appDispatcher = require('dispatchers/appDispatcher');

module.exports = {
  receiveCreateNewUserSuccess: function(newUserData) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_CREATE_NEW_USER_SUCCESS,
      newUserData: newUserData
    });
  },

  receiveUserDoesntExist: function() {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_USER_DOESNT_EXIST
    });
  },

  receiveUserMeta: function(meta) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.RECEIVE_USER_META,
      meta: meta
    });
  }
};
