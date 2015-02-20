/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var uniqueId = require('lodash/utility/uniqueId');

function convertDataForDay(dayKey: string, user: Immutable.Map): Immutable.Map {
  if (!dayKey || dayKey === '' || !user) {
    return Immutable.Map({});
  }

  return Immutable.Map({
    dayKey: dayKey,
    dayUniqueId: uniqueId('day_'),
    currentUserId: user.getIn(['user', 'userId']),
    daysDataUrl: user.getIn(['user', 'dataUrl']) + '/days/' + dayKey,
    dataDataUrl: user.getIn(['user', 'dataUrl']) + '/data/' + dayKey
  });
}

module.exports = {
  convertDataForDay
};
