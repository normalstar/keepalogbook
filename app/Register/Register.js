/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var RegisterViewActionCreators = require('./RegisterViewActionCreators');

var Register = React.createClass({
  handleClickFacebookRegister(e: Object) {
    e.preventDefault();
    RegisterViewActionCreators.authorizeWithFacebook();
  },

  handleClickTwitterRegister(e: Object) {
    e.preventDefault();
    RegisterViewActionCreators.authorizeWithTwitter();
  },

  render(): any {
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
