/**
 * All user stuff, including auth information.
 */

'use strict';

var Immutable = require('immutable');

var userUtils = require('utils/userUtils');
var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var _user = Immutable.Map({
  user: null,
  auth: null
});

var actions = {};

actions[ACTION_TYPES.RECEIVE_AUTH] = function(action) {
  var user = userUtils.getUserFromRawAuth(action.auth);
  _user = _user.merge({auth: action.auth, user: user});
};

actions[ACTION_TYPES.RECEIVE_LOGGED_OUT] = function() {
  _user = _user.merge({auth: null, user: null});
};

actions[ACTION_TYPES.RECEIVE_CREATE_NEW_USER_SUCCESS] = function(action) {
  _user = _user.merge({user: action.newUserData});
};

actions[ACTION_TYPES.RECEIVE_USER_DOESNT_EXIST] = function() {
  _user = _user.mergeIn(['user'], {meta: {needToCreate: true}});
};

actions[ACTION_TYPES.RECEIVE_USER_META] = function(action) {
  _user = _user.updateIn(['user', 'meta'], action.meta);
};

module.exports = assign(new Store(actions), {
  initialize: function() {},

  get: function() {
    return _user;
  }
});



