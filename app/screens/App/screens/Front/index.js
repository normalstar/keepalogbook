/**
 * This is the route handler for front page.
 */

'use strict';

var React = require('react/addons');
var Front = null;

var FrontHandler = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      require.ensure([], function() {
        Front = require('./components/Front');
        callback();
      }, 'front');
    }
  },

  render: function() {
    return (
      <Front />
    );
  }
});

module.exports = FrontHandler;
