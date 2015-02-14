var keyMirror = require('keymirror');

module.exports = {
  ACTION_TYPES: keyMirror({
    RECEIVE_AUTH: null,
    RECEIVE_LOGGED_OUT: null,

    // userActionCreators
    RECEIVE_CREATE_NEW_USER_SUCCESS: null,
    RECEIVE_USER_DOESNT_EXIST: null,
    RECEIVE_USER_META: null,

    // day
    RECEIVE_DAY_LOG: null,
    CREATE_LOG: null
  })
};
