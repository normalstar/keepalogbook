/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

function receiveAddedLog(rawLog: RawLog) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_ADDED_LOG,
    rawLog: rawLog
  });
}

module.exports = {
  receiveAddedLog
};
