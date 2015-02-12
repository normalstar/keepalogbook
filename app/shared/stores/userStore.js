/**
 * All user stuff, including auth information.
 */

'use strict';

var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var user = {};
var actions = {};

actions[ACTION_TYPES.RECEIVE_AUTH] = function(action) {
  console.log('hi receive auth', action);
};

var userStore = new Store(actions);

assign(userStore, {
  initialize: function() {
    console.log('initialize user store');
  },

  get: function() {
    return user;
  }
});

module.exports = userStore;


