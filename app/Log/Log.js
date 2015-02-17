/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Log = React.createClass({
  propTypes: {
    log: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleClickRemove(e: Object) {
    e.preventDefault();


  },

  render(): any {
    return (
      <div>
        {this.props.log.get('value')}
        {' '}
        <a href="#" onClick={this.handleClickRemove}>Remove</a>
      </div>
    );
  }
});

module.exports = Log;
