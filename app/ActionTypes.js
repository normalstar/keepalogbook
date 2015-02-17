/**
 * @flow
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  RECEIVE_AUTH: null,
  RECEIVE_LOGGED_OUT: null,

  // user
  RECEIVE_USER_META: null,

  // day
  RECEIVE_ADDED_LOG: null,
  RECEIVE_REMOVED_LOG: null,
  RECEIVE_CHANGED_LOG: null,

  CHANGE_CURRENT_LOG: null,
  SUBMIT_CURRENT_LOG: null,

  // log
  TOGGLE_EDIT_LOG: null,
  CHANGE_EDITING_LOG: null,
  SUBMIT_EDITING_LOG: null
});
