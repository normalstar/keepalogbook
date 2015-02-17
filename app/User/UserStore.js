/**
 * All user stuff, including auth information.
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var UserUtils = require('./UserUtils');
var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var _user = Immutable.Map({
  user: null,
  auth: null
});

var actions = {};

actions[ActionTypes.RECEIVE_AUTH] = function(action) {
  var user = UserUtils.getUserFromRawAuth(action.auth);
  _user = _user.merge({auth: action.auth, user: user});
};

actions[ActionTypes.RECEIVE_LOGGED_OUT] = function() {
  _user = _user.merge({auth: null, user: null});
};

actions[ActionTypes.RECEIVE_USER_META] = function(action) {
  _user = _user.updateIn(['user'], function(userData) {
    return userData.merge({meta: action.meta});
  });
};

module.exports = assign(new Store(actions), {
  initialize: function() {
  },

  get: function() {
    return _user;
  }
});
