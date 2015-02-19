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

var Calendar = require('../Calendar/Calendar');

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
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
  },

  handleClickLogOut(e: Object) {
    e.preventDefault();
    InsideViewActionCreators.logOut();
  },

  render(): any {
    return (
      <div className="inside">
        <InsideHeader />

        <Calendar year={2015} month={1} />
        <Calendar year={2015} month={2} />
        <Calendar year={2015} month={3} />
        <Calendar year={2015} month={4} />
        <Calendar year={2015} month={5} />
        <Calendar year={2015} month={6} />

        {this.props.children}

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
