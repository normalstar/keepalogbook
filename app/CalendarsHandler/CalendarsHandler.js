/**
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var Calendars = require('../Calendars/Calendars');

require('./CalendarsHandler.less');

var CalendarsHandler = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="calendars-handler">
        <Calendars user={this.props.user}
          isCalendarPage={true}
        />
      </div>
    );
  }
});

module.exports = CalendarsHandler;
