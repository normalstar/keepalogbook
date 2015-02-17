/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var UserViewActionCreators = require('../User/UserViewActionCreators');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  },

  componentWillMount() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
  },

  render(): any {
    return (
      <div>
        Inside!
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Inside;
