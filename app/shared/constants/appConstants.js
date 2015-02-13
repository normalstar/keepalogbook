var keyMirror = require('keymirror');

module.exports = {
  ACTION_TYPES: keyMirror({
    RECEIVE_AUTH: null,
    RECEIVE_LOGGED_OUT: null,

    // Front
    RECEIVE_HAS_USERNAME: null,
    RECEIVE_HAS_NO_USERNAME: null,

    // ChooseUsername
    CHANGE_NEW_USERNAME: null,
    SUBMIT_NEW_USERNAME: null,

    // User
    LOAD_USER_PAGE: null
  })
};
