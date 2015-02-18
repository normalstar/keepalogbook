'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { Link } = require('react-router');

var Logo = require('../Logo/Logo');

require('./InsideHeader.less');

var InsideHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="inside-header">
        <Link to="frontDay" className="inside-header__link">
          <Logo maxHeight="18px" />
        </Link>
      </div>
    );
  }
});

module.exports = InsideHeader;
