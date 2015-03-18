/**
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var InsideHeader = require('./InsideHeader');
var InsideFooter = require('./InsideFooter');
var UserViewActionCreators = require('../User/UserViewActionCreators');

var Calendars = require('../Calendars/Calendars');

require('./Inside.less');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );
    UserViewActionCreators.listenToCalendar(this.props.user.get('user'));
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
    UserViewActionCreators.stopListeningToCalendar(this.props.user.get('user'));
  },

  render(): any {
    var calendar = this.props.user.get('showCalendar') ?
        <Calendars user={this.props.user} /> : null;

    return (
      <div className="inside">
        <InsideHeader />

        {calendar}

        {this.props.children}

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
