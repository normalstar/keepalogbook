'use strict';

var firebaseUtils = require('../shared/firebaseUtils');

module.exports = {
  removeLog: function(log) {
    return firebaseUtils.remove(log.dataUrl);
  }
};
