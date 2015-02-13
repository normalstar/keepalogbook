'use strict';

var appDispatcher = require('dispatchers/appDispatcher');
var { ACTION_TYPES } = require('constants/appConstants');

module.exports = {
  changeNewUsername: function(newUsername) {
    appDispatcher.handleAction({
      type: ACTION_TYPES.CHANGE_NEW_USERNAME,
      newUsername: newUsername
    });
  }
};
