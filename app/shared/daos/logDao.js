'use strict';

var firebaseUtils = require('utils/firebaseUtils');

module.exports = {
  removeLog: function(log) {
    return firebaseUtils.remove(log.dataUrl);
  }
};
