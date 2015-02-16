'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var userViewActionCreators = require('actions/userViewActionCreators');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  },

  componentWillMount() {
    userViewActionCreators.listenToUserMeta(
      this.props.user.get('user').toJS(),
      this.props.user.get('auth').toJS()
    );
  },

  componentWillUnmount() {
    userViewActionCreators.stopListeningToUserMeta(this.props.user.get('user').toJS());
  },

  render() {
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
