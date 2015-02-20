/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var InsideHeader = require('./InsideHeader');
var InsideFooter = require('./InsideFooter');
var UserViewActionCreators = require('../User/UserViewActionCreators');
var InsideViewActionCreators = require('./InsideViewActionCreators');

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

  handleClickLogOut(e: Object) {
    e.preventDefault();
    InsideViewActionCreators.logOut();
  },

  render(): any {
    return (
      <div className="inside">
        <InsideHeader />

        <Calendars user={this.props.user} />

        {this.props.children}

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
