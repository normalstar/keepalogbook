/**
 * @flow
 */

'use strict';

function addRawDayIntoCalendar(rawDay: RawDay, calendars: Object): Object {
  var monthKey = rawDay.key.slice(0, -2);
  var dayKey = rawDay.key.slice(-2, rawDay.key.length);
  return calendars.setIn([monthKey, dayKey], rawDay.value);
}

module.exports = {
  addRawDayIntoCalendar
};
