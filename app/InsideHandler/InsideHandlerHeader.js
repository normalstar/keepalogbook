'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { Link } = require('react-router');

var Logo = require('../Logo/Logo');

require('./InsideHandlerHeader.less');

var InsideHandlerHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="inside-handler-header">
        <Link to="today" className="inside-handler-header__link">
          <Logo logoWidth="24px" logoHeight="24px" circle={false} />
        </Link>
      </div>
    );
  }
});

module.exports = InsideHandlerHeader;
