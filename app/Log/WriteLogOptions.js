/**
 * This has save or cancel for use under the write box.
 *
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

require('./WriteLogOptions.less');

var WriteLogOptions = React.createClass({
  propTypes: {
    onCancel: PropTypes.func,
    onSave: PropTypes.func.isRequired
  },

  mixins: [PureRenderMixin],

  handleClickSave(e: Object) {
    e.preventDefault();
    this.props.onSave();
  },

  handleClickCancel(e: Object) {
    e.preventDefault();
    this.props.onCancel();
  },

  render(): any {
    var cancel = this.props.onCancel ?
      <a href="#"
        className="write-log-options__cancel"
        onClick={this.handleClickCancel}>
        Cancel
      </a> : null;

    return (
      <div className="write-log-options">
        <a href="#"
          className="write-log-options__save"
          onClick={this.handleClickSave}>
          Save
        </a>
        <span className="write-log-options__save-instructions">
          or ctrl/cmd + enter
        </span>

        {cancel}
      </div>
    );
  }
});

module.exports = WriteLogOptions;

