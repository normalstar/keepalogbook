'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

var Logo = require('../Logo/Logo');

require('./OutsideHeader.less');

var OutsideHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="outside-header">
        <Logo logoWidth="36px" logoHeight="36px" circle={false} />
        <h1 className="outside-header__title">
          Keep a logbook
        </h1>
      </div>
    );
  }
});

module.exports = OutsideHeader;
