/**
 * @flow
 */

'use strict';

var moment = require('moment');
var curry = require('lodash/function/curry');

function formatMomentDef(formatString: string, momentDate): string {
  return momentDate.format(formatString);
}

var formatMoment = curry(formatMomentDef);

function getCurrentDayKey(): string {
  return formatMoment('YYYYMMDD', moment());
}

module.exports = {
  formatMoment,
  getCurrentDayKey
};
