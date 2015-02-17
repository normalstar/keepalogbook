/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var Textarea = require('react-textarea-autosize');

require('./WriteLog.less');

var WriteLog = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired
  },

  mixins: [PureRenderMixin],

  handleKeyDown(e: Object) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      this.props.onFinish();
    }
  },

  render(): any {
    return (
      <div className="write-log">
        <Textarea className="write-log__textarea"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Don't worry, you're awesome. So write something."
        />
      </div>
    );
  }
});

module.exports = WriteLog;

