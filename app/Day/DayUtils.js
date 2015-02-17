/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');

function convertDataForDay(dayKey: string, user: Immutable.Map): Immutable.Map {
  if (!dayKey || dayKey === '' || !user) {
    return Immutable.Map({});
  }

  return Immutable.Map({
    dayKey: dayKey,
    daysDataUrl: user.getIn(['user', 'dataUrl']) + '/days/' + dayKey,
    dataDataUrl: user.getIn(['user', 'dataUrl']) + '/data/' + dayKey
  });
}

function getLogIndexFromKey(day: Immutable.Map, key: string): number {
  return day.get('logs').findIndex(log => log.get('key') === key);
}

module.exports = {
  convertDataForDay,
  getLogIndexFromKey
};
