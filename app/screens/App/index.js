'use strict';

var React = require('react/addons');
var { RouteHandler } = require('react-router');

require('normalize-css/normalize.css');

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        App!
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
