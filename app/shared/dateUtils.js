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

function getDayParams(momentDate: Object): Object {
  return {
    year: formatMoment('YYYY')(momentDate),
    month: formatMoment('MM')(momentDate),
    day: formatMoment('DD')(momentDate)
  };
}

function getNextDay(momentDate: Object): Object {
  return momentDate.clone().add(1, 'days');
}

function getPreviousDay(momentDate: Object): Object {
  return momentDate.clone().subtract(1, 'days');
}

function getPreviousDayLinkParams(momentDate: Object): Object {
  return compose(getDayParams, getPreviousDay)(momentDate);
}

function getNextDayLinkParams(momentDate: Object): Object {
  return compose(getDayParams, getNextDay)(momentDate);
}

module.exports = {
  formatMoment,
  getCurrentMoment,
  getCurrentDayKey,
  parseDayKey,
  isInFuture,
  getDayParams,
  getPreviousDay,
  getNextDay,
  getPreviousDayLinkParams,
  getNextDayLinkParams
};
