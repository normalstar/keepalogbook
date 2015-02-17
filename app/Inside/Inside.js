'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var UserViewActionCreators = require('../User/UserViewActionCreators');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  },

  componentWillMount: function() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user').toJS(),
      this.props.user.get('auth').toJS()
    );
  },

  componentWillUnmount: function() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user').toJS());
  },

  render: function() {
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
