'use strict';

var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');

module.exports = {
  receiveCreateNewUserSuccess: function(newUserData) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_CREATE_NEW_USER_SUCCESS,
      newUserData: newUserData
    });
  },

  receiveUserDoesntExist: function() {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_USER_DOESNT_EXIST
    });
  },

  receiveUserMeta: function(meta) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_USER_META,
      meta: meta
    });
  }
};
