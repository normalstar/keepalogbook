/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');

function removeLeadingZero(string: string): string {
  return string.charAt(0) === '0' ? string.slice(1, 2) : string;
}

/**
 * Key is always YYYYMMDD format.
 */
function splitRawDay(rawDay: RawDay): Object {
  var yearKey = rawDay.key.slice(0, 4);

  var monthKey = rawDay.key.slice(4, 6);
  monthKey = removeLeadingZero(monthKey);

  var dayKey = rawDay.key.slice(6, 8);
  dayKey = removeLeadingZero(dayKey);

  return {
    yearKey,
    monthKey,
    dayKey
  };
}

function addRawDayIntoCalendar(rawDay: RawDay, calendars: Object): Object {
  var { yearKey, monthKey, dayKey } = splitRawDay(rawDay);
  return calendars.setIn([yearKey + monthKey, dayKey], Immutable.Map(rawDay.value));
}

module.exports = {
  addRawDayIntoCalendar
};
