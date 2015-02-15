'use strict';

var Immutable = require('immutable');
var compose = require('lodash/function/compose');

var logUtils = require('utils/logUtils');
var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var _day = Immutable.Map({
  logs: Immutable.List()
});

var actions = {};

actions[ACTION_TYPES.RECEIVE_DAY_LOG] = function(action) {
  _day = compose(_day.logs.push, logUtils.convertRawLog)(action.rawLog);
};

module.exports = assign(new Store(actions), {
  initialize: function() {},

  get: function() {
    return _day;
  }
});
