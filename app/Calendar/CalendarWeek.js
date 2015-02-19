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

// var dateUtils = require('../shared/dateUtils');

var CalendarWeek = React.createClass({
  propTypes: {
    sunday: PropTypes.object.isRequired,
    monthDay: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var days = range(0, 7).map(function(plus, index) {
      var moment = this.props.sunday.clone().add(plus, 'day');
      var day = {
        moment: moment,
        isDifferentMonth: !moment.isSame(this.props.monthDay, 'month')
      };
      return <CalendarDay day={day} key={index} />;
    }.bind(this));

    return (
      <div>
        {days}
      </div>
    );
  }
});

module.exports = CalendarWeek;
