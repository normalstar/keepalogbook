var Immutable = require('immutable');

function convertRawLog(rawLog: RawLog, day: Day): Immutable.Map {
  return Immutable.Map({
    key: rawLog.key,
    dataUrl: day.dataDataUrl + '/' + rawLog.key,
    log: rawLog.value.log,
    isEditing: false,
    editingValue: '',
    isViewingOptions: false,
    isConfirmingRemove: false
  });
}

function convertLogToSave(log: Object): LogToSave {
  return {
    log: log.get('editingValue'),
    ts: new Date().getTime()
  };
}

module.exports = {
  convertRawLog,
  convertLogToSave
};
