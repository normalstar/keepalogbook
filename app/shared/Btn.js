/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;

require('./Btn.less');

var Btn = React.createClass({
  propTypes: {
    inverse: PropTypes.bool,
    children: PropTypes.any.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var { inverse, children, ...other } = this.props;

    var classes = classSet({
      'btn': true,
      'btn--inverse': inverse
    });

    return (
      <a className={classes} {...other}>
        {children}
      </a>
    );
  }
});

module.exports = Btn;
