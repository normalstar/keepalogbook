'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

require('./Logo.less');

var Logo = React.createClass({
  propTypes: {
    logoWidth: PropTypes.string.isRequired,
    logoHeight: PropTypes.string.isRequired,
    circle: PropTypes.bool
  },

  mixins: [PureRenderMixin],

  render(): any {
    var logo = (
      <div className="logo">
        <div className="logo__circle logo__circle1">
          <div className="logo__inner-circle"></div>
        </div>
        <div className="logo__circle logo__circle2">
          <div className="logo__inner-circle"></div>
        </div>
        <div className="logo__circle logo__circle3">
          <div className="logo__inner-circle"></div>
        </div>
        <div className="logo__rect logo__rectangle1">
          <div className="logo__inner-rect logo__short-rect"></div>
        </div>
        <div className="logo__rect logo__rectangle2">
          <div className="logo__inner-rect logo__short-rect"></div>
        </div>
        <div className="logo__rect logo__rectangle3">
          <div className="logo__inner-rect logo__long-rect"></div>
        </div>
      </div>
    );

    return this.props.circle ?
      <div className="logo__circle-container" style={{width: this.props.logoWidth, height: this.props.logoHeight}}>
        {logo}
      </div> :
      <div style={{width: this.props.logoWidth, height: this.props.logoHeight, display: 'inline-block'}}>
        {logo}
      </div>;
  }
});

module.exports = Logo;
