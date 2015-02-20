/**
 * @flow
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  RECEIVE_AUTH: null,
  RECEIVE_LOGGED_OUT: null,

  // user
  RECEIVE_USER_META: null,

  // calendar
  RECEIVE_ADDED_DAY: null,
  RECEIVE_REMOVED_DAY: null,
  RECEIVE_CHANGED_DAY: null,

  // day
  RECEIVE_ADDED_LOG: null,
  RECEIVE_REMOVED_LOG: null,
  RECEIVE_CHANGED_LOG: null,

  CHANGE_CURRENT_LOG: null,
  SUBMIT_CURRENT_LOG: null,

  TRANSITION_TO_DAY: null,
  LOAD_DAY: null,

  // log
  TOGGLE_VIEW_LOG_OPTIONS: null,
  TOGGLE_CONFIRM_REMOVE_LOG: null,

  TOGGLE_EDIT_LOG: null,
  CHANGE_EDITING_LOG: null,
  SUBMIT_EDITING_LOG: null
});
