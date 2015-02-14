'use strict';

var React = require('react/addons');
var frontViewActionCreators = require('../actions/frontViewActionCreators');

var Register = React.createClass({
  handleClickFacebookRegister: function(e) {
    e.preventDefault();
    frontViewActionCreators.authorizeWithFacebook();
  },

  handleClickTwitterRegister: function(e) {
    e.preventDefault();
    frontViewActionCreators.authorizeWithTwitter();
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
