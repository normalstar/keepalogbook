/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var FrontHandlerViewActionCreators = require('./FrontHandlerViewActionCreators');

require('./FrontHandler.less');

var FrontHandler = React.createClass({
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
      <div className="front-handler">
        <p className="front-handler__intro">
          I think you should write down the things you do every day. Even
          the mundane and uneventful days. Especially the mundane and uneventful
          days. Not for any particular reason except to not forget when you
          normally would.
        </p>
        <div className="front-handler__auth-title">
          Log in / Create an account
        </div>
        <div className="front-handler__providers">
          <a href="#"
            onClick={this.handleClickFacebookRegister}
            className="front-handler__provider">
            <span className="icon-facebook2"></span>
            {' '}
            Facebook
          </a>
          <a href="#" onClick={this.handleClickTwitterRegister}
            className="front-handler__provider">
            <span className="icon-twitter2"></span>
            {' '}
            Twitter
          </a>
        </div>
      </div>
    );
  }
});

module.exports = FrontHandler;
