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
        <Link to="today" className="inside-header__link">
          <Logo logoWidth="24px" logoHeight="24px" circle={false} />
        </Link>
      </div>
    );
  }
});

module.exports = InsideHeader;
