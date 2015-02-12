'use strict';

var { Dispatcher } = require('flux');
var assign = require('object-assign');

module.exports = assign(new Dispatcher(), {
  handleAction: function(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }
});

