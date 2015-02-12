'use strict';

var assign = require('object-assign');
var appDispatcher = require('dispatchers/appDispatcher');
var { EventEmitter } = require('events');

var Store = function(changeEvent, dispatchTypes) {
  this.setMaxListeners(0);
  this.changeEvent = changeEvent;
  this.dispatchToken = appDispatcher.register(function(payload) {
    var action = payload.action;
    if (dispatchTypes[action.type]) {
      var emitChange = dispatchTypes[action.type](action);
      if (emitChange !== false) {
        this.emitChange();
      }
    }
  }.bind(this));
};

assign(Store.prototype, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(this.changeEvent);
  },

  addChangeListener: function(callback) {
    this.on(this.changeEvent, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(this.changeEvent, callback);
  }
});

module.exports = Store;
