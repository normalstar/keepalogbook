var keyMirror = require('keymirror');

module.exports = {
  ACTION_TYPES: keyMirror({
    RECEIVE_AUTH: null,
    RECEIVE_LOGGED_OUT: null,

    // user
    RECEIVE_USER_META: null,

    // day
    RECEIVE_DAY_LOG: null,
    CREATE_LOG: null
  })
};
