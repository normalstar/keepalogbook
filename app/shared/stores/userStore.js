/**
 * All user stuff, including auth information.
 */

'use strict';

var Immutable = require('immutable');

var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var _user = Immutable.Map({
  auth: Immutable.Map({}),
  username: '',
  redirectFromAuth: false
});

var actions = {};

actions[ACTION_TYPES.RECEIVE_AUTH] = function(action) {
  _user = _user.set('auth', Immutable.fromJS(action.auth));
};

actions[ACTION_TYPES.RECEIVE_LOGGED_OUT] = function() {
  _user = _user.set('auth', Immutable.Map({}));
};


var userStore = new Store(actions);

assign(userStore, {
  initialize: function() {
    console.log('initialize user store');
  },

  get: function() {
    return _user;
  }
});

module.exports = userStore;


