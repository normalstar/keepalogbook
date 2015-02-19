/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var RegisterViewActionCreators = require('./RegisterViewActionCreators');

require('./Register.less');

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
      <div className="register">
        <p className="register__intro">
          I think you should write down the things you do every day. Even
          the mundane and uneventful days. Especially the mundane and uneventful
          days. Not for any particular reason except to not forget when you
          normally would.
        </p>
        <div className="register__auth-title">
          Log in / Create an account
        </div>
        <div className="register__providers">
          <a href="#"
            onClick={this.handleClickFacebookRegister}
            className="register__provider">
            <span className="icon-facebook2"></span>
            {' '}
            Facebook
          </a>
          <a href="#" onClick={this.handleClickTwitterRegister}
            className="register__provider">
            <span className="icon-twitter2"></span>
            {' '}
            Twitter
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Register;
