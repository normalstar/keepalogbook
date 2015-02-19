/**
 * A group of calendar months.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var range = require('lodash/utility/range');
var dateUtils = require('../shared/dateUtils');

var Calendar = require('../Calendar/Calendar');

require('./Calendars.less');

var Calendars = React.createClass({
  propTypes: {
  },

  mixins: [PureRenderMixin],

  render(): any {
    var currentMonth = dateUtils.getCurrentMoment();
    var months = range(0, 13).map(function(minus) {
      var month = currentMonth.clone().subtract(minus, 'months');
      var monthNum = parseInt(month.format('M'), 10);
      var yearNum = parseInt(month.format('YYYY'), 10);
      return (
        <Calendar year={yearNum}
          month={monthNum}
          key={'' + yearNum + monthNum}
          isCurrentMonth={minus === 0}
        />
      );
    });

    return (
      <div className="calendars">
        {months}
      </div>
    );
  }
});

module.exports = Calendars;
