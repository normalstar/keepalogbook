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
    currentUserId: user.getIn(['user', 'userId']),
    daysDataUrl: user.getIn(['user', 'dataUrl']) + '/days/' + dayKey,
    dataDataUrl: user.getIn(['user', 'dataUrl']) + '/data/' + dayKey
  });
}

module.exports = {
  convertDataForDay
};
