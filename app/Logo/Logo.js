'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Logo = React.createClass({
  propTypes: {
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string
  },

  mixins: [PureRenderMixin],

  render(): any {
    var style = {
      maxWidth: this.props.maxWidth || '100%',
      maxHeight: this.props.maxHeight || 'none'
    };

    return (
      <img src="/images/logo.png" style={style} />
    );
  }
});

module.exports = Logo;
