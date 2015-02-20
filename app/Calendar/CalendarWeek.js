/**
 * A week starting from Sunday.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var range = require('lodash/utility/range');
var CalendarDay = require('./CalendarDay');

var CalendarWeek = React.createClass({
  propTypes: {
    sunday: PropTypes.object.isRequired,
    monthDay: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool.isRequired,
    monthData: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    var days = range(0, 7).map(function(plus, index) {
      var moment = this.props.sunday.clone().add(plus, 'day');
      var display = moment.format('D');
      var dayData = this.props.monthData && this.props.monthData.get(display) || null;
      return (
        <CalendarDay
          display={display}
          key={index}
          dayData={dayData}
        />
      );
    }.bind(this));

    return (
      <div>
        {days}
      </div>
    );
  }
});

module.exports = CalendarWeek;
