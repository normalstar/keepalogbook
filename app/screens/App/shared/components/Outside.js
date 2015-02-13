'use strict';

var React = require('react/addons');
var { PropTypes } = React;

var Outside = React.createClass({
  propTypes: {
    children: PropTypes.any.isRequired
  },

  render: function() {
    return (
      <div>
        Outside!
        {this.props.children}
      </div>
    );
  }
});

module.exports = Outside;
