/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

require('./DayHeader.less');

var DayHeader = React.createClass({
  propTypes: {
    displayDate: PropTypes.string.isRequired,
    isToday: PropTypes.bool
  },

  mixins: [PureRenderMixin],

  render(): any {
    var titleText = this.props.isToday ?
      'What did you do today on' :
      'What did you do on';

    return (
      <div className="day-header">
        <div className="day-header__title">
          {titleText}
        </div>
        <div className="day-header__date">
          {this.props.displayDate}
        </div>
      </div>
    );
  }
});

module.exports = DayHeader;
