/**
 * @flow
 */

'use strict';

var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');

module.exports = {
  receiveUserMeta: function(meta: UserMeta) {
    Dispatcher.handleAction({
      type: ActionTypes.RECEIVE_USER_META,
      meta: meta
    });
  }
};
