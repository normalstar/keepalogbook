'use strict';

var React = require('react/addons');
var { PropTypes } = React;

var Inside = React.createClass({
  propTypes: {
    children: PropTypes.any.isRequired
  },

  render: function() {
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
