'use strict';

var Immutable = require('immutable');

function convertRawLog(rawLog: RawLog): Immutable.Map {
  return Immutable.Map(rawLog);
}

module.exports = {
  convertRawLog
};
