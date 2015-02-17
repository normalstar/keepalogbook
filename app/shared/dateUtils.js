'use strict';

var moment = require('moment');
var curry = require('lodash/function/curry');

/**
 * @param {string} formatString
 * @param {Moment} momentDate
 * @return {string}
 */
function formatMomentDef(formatString, momentDate) {
  return momentDate.format(formatString);
}

var formatMoment = curry(formatMomentDef);

module.exports = {
  formatMoment: formatMoment,

  getCurrentDayKey: function() {
    return formatMoment('YYYYMMDD', moment());
  }
};
