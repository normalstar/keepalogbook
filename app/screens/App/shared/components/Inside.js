'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var userViewActionCreators = require('actions/userViewActionCreators');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  },

  componentWillMount: function() {
    userViewActionCreators.listenToUserMeta(
      this.props.user.get('user').toJS(),
      this.props.user.get('auth').toJS()
    );
  },

  componentWillUnmount: function() {
    userViewActionCreators.stopListeningToUserMeta(this.props.user.get('user').toJS());
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
