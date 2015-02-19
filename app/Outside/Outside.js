/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var OutsideHeader = require('./OutsideHeader');

require('./Outside.less');

var Outside = React.createClass({
  propTypes: {
    children: PropTypes.any.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="outside">
        <OutsideHeader />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Outside;
