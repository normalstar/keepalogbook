/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var UserViewActionCreators = require('../User/UserViewActionCreators');
var FrontHandlerViewActionCreators = require('../FrontHandler/FrontHandlerViewActionCreators');

require('./Inside.less');

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

  handleClickLogOut(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.logOut();
  },

  render(): any {
    return (
      <div className="inside">
        <div>
          {this.props.children}
        </div>

        <div className="inside__footer">
          {this.props.user.getIn(['user', 'meta', 'displayName'])}
          <div>
            <a href="#" onClick={this.handleClickLogOut}>
              Log out
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Inside;
