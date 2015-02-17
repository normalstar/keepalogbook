/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var FrontHandlerViewActionCreators = require('../FrontHandler/FrontHandlerViewActionCreators');

var Register = React.createClass({
  handleClickFacebookRegister(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.authorizeWithFacebook();
  },

  handleClickTwitterRegister(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.authorizeWithTwitter();
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
