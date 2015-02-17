'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

module.exports = {
  /**
   * @param {Object|string} log
   */
  receiveAddedLog: function(rawLog) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_ADDED_LOG,
      rawLog: rawLog
    });
  }
};
