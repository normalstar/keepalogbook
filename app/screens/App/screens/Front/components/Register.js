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

  handleClickTwitterRegister: function(e) {
    e.preventDefault();
    frontActionCreators.authorizeWithTwitter();
  },

  render: function() {
    return (
      <div>
        <a href="#" onClick={this.handleClickFacebookRegister}>
          Register with Facebook
        </a>
        <a href="#" onClick={this.handleClickTwitterRegister}>
          Register with Twitter
        </a>
      </div>
    );
  }
});

module.exports = Register;
