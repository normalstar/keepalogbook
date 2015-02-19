'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

var Logo = require('../Logo/Logo');

require('./OutsideHandlerHeader.less');

var OutsideHandlerHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="outside-handler-header">
        <Logo logoWidth="36px" logoHeight="36px" circle={false} />
        <h1 className="outside-handler-header__title">
          Keep a logbook
        </h1>
      </div>
    );
  }
});

module.exports = OutsideHandlerHeader;
