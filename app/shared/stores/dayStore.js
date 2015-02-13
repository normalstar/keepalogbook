'use strict';

var Immutable = require('immutable');

var dayUtils = require('utils/dayUtils');
var Store = require('utils/Store');
var assign = require('lodash/object/assign');
var { ACTION_TYPES } = require('constants/appConstants');

var _day = Immutable.Map({});

var actions = {};

actions[ACTION_TYPES.RECEIVE_DAY] = function(action) {
  _day = _day.merge(dayUtils.convertRawDay(action.rawDay, action.dateKey));
};

module.exports = assign(new Store(actions), {
  initialize: function() {},

  get: function() {
    return _day;
  }
});
