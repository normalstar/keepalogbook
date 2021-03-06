/**
 * @flow
 */

function removeLeadingZero(string/*: string*/)/*: string*/ {
  return string.charAt(0) === '0' ? string.slice(1, 2) : string;
}

/**
 * Key is always YYYYMMDD format.
 */
function splitDayKey(key/*: string*/)/*: Object*/ {
  var yearKey = key.slice(0, 4);

  var monthKey = key.slice(4, 6);
  monthKey = removeLeadingZero(monthKey);

  var dayKey = key.slice(6, 8);
  dayKey = removeLeadingZero(dayKey);

  return {
    yearKey,
    monthKey,
    dayKey
  };
}

module.exports = {
  splitDayKey
};
