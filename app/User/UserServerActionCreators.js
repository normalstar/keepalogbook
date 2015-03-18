/**
 * @flow
 */

var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');
var curry = require('lodash/function/curry');

function receiveUserMeta(meta: UserMeta) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_USER_META,
    meta
  });
}

function receiveDayDef(type: string, rawDay: RawDay) {
  Dispatcher.handleAction({
    type,
    rawDay
  });
}

var receiveDay = curry(receiveDayDef);

module.exports = {
  receiveUserMeta,
  receiveAddedDay: receiveDay(ActionTypes.RECEIVE_ADDED_DAY),
  receiveRemovedDay: receiveDay(ActionTypes.RECEIVE_REMOVED_DAY),
  receiveChangedDay: receiveDay(ActionTypes.RECEIVE_CHANGED_DAY)
};
