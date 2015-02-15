'use strict';

var Immutable = require('immutable');

module.exports = {
  /**
   * convertDataForDay
   *
   * @param {string} dayKey
   * @param {Immutable.Map} user
   * @return {Immutable.Map}
   */
  convertDataForDay: function(dayKey, user) {
    if (!dayKey || dayKey === '' || !user) {
      return Immutable.Map({});
    }

    return Immutable.Map({
      dayKey: dayKey,
      daysDataUrl: user.getIn(['user', 'dataUrl']) + '/days/' + dayKey,
      dataDataUrl: user.getIn(['user', 'dataUrl']) + '/data/' + dayKey
    });
  }
};
