/**
 * This is the front page with an explanation, demo, and login/register
 * functionality.
 */

'use strict';

var React = require('react/addons');

var Register = require('./components/Register');

var Front = React.createClass({
  render: function() {
    return (
      <div>
        Front!
        <div>
          <Register />
        </div>
      </div>
    );
  }
});

module.exports = Front;
