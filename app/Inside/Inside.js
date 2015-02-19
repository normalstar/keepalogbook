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

  componentWillMount() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );
  },

  componentWillUpdate(nextProps: any) {
    if (!nextProps.user) {
      UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
    }
  },

  handleClickLogOut(e: Object) {
    e.preventDefault();
    InsideViewActionCreators.logOut();
  },

  render(): any {
    var handler = this.props.user.get('auth') ?
      <RouteHandler user={this.props.user} /> : null;

    return (
      <div className="inside">
        <InsideHeader />

        {handler}

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
