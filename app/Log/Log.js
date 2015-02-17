/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var WriteLog = require('./WriteLog');

var LogViewActionCreators = require('./LogViewActionCreators');
var inputUtils = require('../shared/inputUtils');

require('./Log.less');

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

  handleFinishEditing() {
    LogViewActionCreators.submitEditingLog(this.props.log);
  },

  render(): any {
    var log = this.props.log;
    var content = log.get('isEditing') ?
      <div>
        <WriteLog value={log.get('editingValue')}
          onChange={this.handleChangeValue}
          onFinish={this.handleFinishEditing}
        />
        {' '}
        <a href="#" onClick={this.handleToggleEdit}>Cancel</a>
      </div>:
      <div>
        <div dangerouslySetInnerHTML={{__html: inputUtils.nl2br(log.get('log'))}}>
        </div>
        <a href="#" onClick={this.handleClickRemove}>Remove</a>
        {' '}
        <a href="#" onClick={this.handleToggleEdit}>Edit</a>
      </div>;

    return (
      <div className="log">
        {content}
      </div>
    );
  }
});

module.exports = Log;
