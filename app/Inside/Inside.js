/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { RouteHandler, Navigation } = require('react-router');

var InsideHeader = require('./InsideHeader');
var InsideFooter = require('./InsideFooter');
var UserViewActionCreators = require('../User/UserViewActionCreators');
var InsideViewActionCreators = require('./InsideViewActionCreators');

require('./Inside.less');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin, Navigation],

  _redirectIfLoggedOut() {
    if (!this.props.user.get('auth')) {
      this.replaceWith('front');
    }
  },

  componentDidUpdate(prevProps: Object) {
    if (!prevProps) { return; }
    this._redirectIfLoggedOut();
  },

  componentWillMount() {
    this._redirectIfLoggedOut();
    if (!this.props.user.get('user')) { return; }
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );
  },

  componentWillUnmount() {
    if (!this.props.user.get('user')) { return; }
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

        <RouteHandler user={this.props.user} />

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
