/**
 * @flow
 */

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

function addCalendarYear() {
  Dispatcher.handleAction({
    type: ActionTypes.ADD_CALENDAR_YEAR
  });
}

module.exports = {
  addCalendarYear
};
