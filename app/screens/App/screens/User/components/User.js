'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var User = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div>
        User!
      </div>
    );
  }
});

module.exports = User;
