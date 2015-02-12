/**
 * Register buttons.
 */

'use strict';

var React = require('react/addons');
var frontActionCreators = require('actions/frontActionCreators');

var Register = React.createClass({
  handleClickFacebookRegister: function(e) {
    e.preventDefault();
    frontActionCreators.authorizeWithFacebook();
  },

  render: function() {
    return (
      <div>
        <a href="#" onClick={this.handleClickFacebookRegister}>
          Register with Facebook
        </a>
      </div>
    );
  }
});

module.exports = Register;
