'use strict';

var Immutable = require('immutable');

var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var _state = Immutable.Map({
  newUsername: ''
});

var actions = {};

actions[ACTION_TYPES.CHANGE_NEW_USERNAME] = function(action) {
  _state = _state.set('newUsername', action.newUsername);
};

actions[ACTION_TYPES.SUBMIT_NEW_USERNAME] = function() {
};

var chooseUsernameStore = new Store(actions);

assign(chooseUsernameStore, {
  initialize: function() {
    console.log('initialize choose username store');
  },

  get: function() {
    return _state;
  }
});

module.exports = chooseUsernameStore;
