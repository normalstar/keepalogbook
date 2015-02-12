/**
 * Register buttons.
 */

'use strict';

var React = require('react/addons');

var Register = React.createClass({
  handleClickFacebookRegister: function(e) {
    e.preventDefault();
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
