/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { RouteHandler, Navigation } = require('react-router');

var OutsideHandlerHeader = require('./OutsideHandlerHeader');

require('./OutsideHandler.less');

var OutsideHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin, Navigation],

  render(): any {
    return (
      <div className="outside-handler">
        <OutsideHandlerHeader />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = OutsideHandler;
