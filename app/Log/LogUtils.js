'use strict';

var Immutable = require('immutable');

function convertRawLog(rawLog: RawLog, day: Day): Immutable.Map {
  return Immutable.Map({
    key: rawLog.key,
    dataUrl: day.dataDataUrl + '/' + rawLog.key,
    value: rawLog.value,
    isEditing: false,
    editingValue: ''
  });
}

function convertLogToSave(log: Immutable.Map): string {
  return log.get('editingValue');
}

module.exports = {
  convertRawLog,
  convertLogToSave
};
