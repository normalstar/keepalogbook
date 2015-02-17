/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var LogViewActionCreators = require('./LogViewActionCreators');

var Log = React.createClass({
  propTypes: {
    log: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleClickRemove(e: Object) {
    e.preventDefault();
    LogViewActionCreators.removeLog(this.props.log);
  },

  handleToggleEdit(e: Object) {
    e.preventDefault();
    LogViewActionCreators.toggleEditLog(this.props.log);
  },

  handleChangeValue(e: Object) {
    LogViewActionCreators.changeEditingLog(this.props.log, e.target.value);
  },

  handleKeyDownValue(e: Object) {
    if (e.keyCode === 13) {
      LogViewActionCreators.submitCurrentLog(this.props.log);
    }
  },

  render(): any {
    var log = this.props.log;
    var content = log.get('isEditing') ?
      <div>
        <input value={log.get('editingValue')}
          onChange={this.handleChangeValue}
          onKeyDown={this.handleKeyDownValue}
        />
        {' '}
        <a href="#" onClick={this.handleToggleEdit}>Cancel</a>
      </div>:
      <div>
        {log.get('value')}
        {' '}
        <a href="#" onClick={this.handleClickRemove}>Remove</a>
        {' '}
        <a href="#" onClick={this.handleToggleEdit}>Edit</a>
      </div>;

    return (
      <div>
        {content}
        {' '}
      </div>
    );
  }
});

module.exports = Log;
