/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');
var curry = require('lodash/function/curry');

function receiveLogDef(actionType: string, rawLog: RawLog) {
  Dispatcher.handleAction({
    type: actionType,
    rawLog: rawLog
  });
}

var receiveLog = curry(receiveLogDef);

module.exports = {
  receiveAddedLog: receiveLog(ActionTypes.RECEIVE_ADDED_LOG),
  receiveRemovedLog: receiveLog(ActionTypes.RECEIVE_REMOVED_LOG),
  receiveChangedLog: receiveLog(ActionTypes.RECEIVE_CHANGED_LOG)
};
