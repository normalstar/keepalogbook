/**
 * A group of calendar months.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Calendar = require('../Calendar/Calendar');

require('./Calendars.less');

var Calendars = React.createClass({
  propTypes: {
  },

  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="calendars">
        <Calendar year={2015} month={1} />
        <Calendar year={2015} month={2} />
        <Calendar year={2015} month={3} />
        <Calendar year={2015} month={4} />
        <Calendar year={2015} month={5} />
        <Calendar year={2015} month={6} />
      </div>
    );
  }
});

module.exports = Calendars;
