/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var curry = require('lodash/function/curry');

var receiveLog = curry(function(actionType, rawLog) {
  Dispatcher.handleAction({
    type: actionType,
    rawLog: rawLog
  });
});

module.exports = {
  receiveAddedLog: receiveLog(ActionTypes.RECEIVE_ADDED_LOG),
  receiveRemovedLog: receiveLog(ActionTypes.RECEIVE_REMOVED_LOG),
  receiveChangedLog: receiveLog(ActionTypes.RECEIVE_CHANGED_LOG)
};
