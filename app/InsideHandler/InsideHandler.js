/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { RouteHandler, Navigation } = require('react-router');

var InsideHandlerHeader = require('./InsideHandlerHeader');
var InsideHandlerFooter = require('./InsideHandlerFooter');
var UserViewActionCreators = require('../User/UserViewActionCreators');
var InsideHandlerViewActionCreators = require('./InsideHandlerViewActionCreators');

require('./InsideHandler.less');

var InsideHandler = React.createClass({
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
    InsideHandlerViewActionCreators.logOut();
  },

  render(): any {
    var handler = this.props.user.get('auth') ?
      <RouteHandler user={this.props.user} /> : null;

    return (
      <div className="inside-handler">
        <InsideHandlerHeader />

        {handler}

        <InsideHandlerFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = InsideHandler;
