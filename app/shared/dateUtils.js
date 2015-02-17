/**
 * @flow
 */

'use strict';

var moment = require('moment');
var curry = require('lodash/function/curry');
var compose = require('lodash/function/compose');

function formatMomentDef(formatString: string, momentDate): string {
  return momentDate.format(formatString);
}

var formatMoment = curry(formatMomentDef);

function getCurrentMoment() {
  return moment();
}

var getCurrentDayKey = compose(formatMoment('YYYYMMDD'), getCurrentMoment);

function parseDayKey(dayKey: string): any {
  return moment(dayKey, 'YYYYMMDD');
}

/**
 * momentDate should only be specific down to the day
 */
function isInFuture(momentDate: Object): boolean {
  return moment().isBefore(momentDate, 'day');
}

module.exports = {
  formatMoment,
  getCurrentMoment,
  getCurrentDayKey,
  parseDayKey,
  isInFuture
};
