/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;
var Textarea = require('react-textarea-autosize');

require('./WriteLog.less');

var WriteLog = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    isNewLog: PropTypes.bool
  },

  mixins: [PureRenderMixin],

  handleKeyDown(e: Object) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      this.props.onFinish();
    }
  },

  render(): any {
    var classes = classSet({
      'write-log__textarea': true,
      'write-log__textarea--new': this.props.isNewLog
    });

    return (
      <div className="write-log">
        <Textarea className={classes}
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Don't worry, you're awesome. So write something."
        />
        <span className="icon-pencil write-log__pencil" />
      </div>
    );
  }
});

module.exports = WriteLog;

