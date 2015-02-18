/**
 * A single log in a day
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin, classSet } = React.addons;

var WriteLog = require('./WriteLog');
var WriteLogOptions = require('./WriteLogOptions');
var Btn = require('../shared/Btn');
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
    LogViewActionCreators.toggleConfirmRemoveLog(this.props.log);
  },

  handleConfirmRemove(e: Object) {
    e.preventDefault();
    LogViewActionCreators.removeLog(this.props.log);
  },

  handleToggleEdit(e: Object) {
    if (e) {
      e.preventDefault();
    }
    LogViewActionCreators.toggleEditLog(this.props.log);
  },

  handleChangeValue(e: Object) {
    LogViewActionCreators.changeEditingLog(this.props.log, e.target.value);
  },

  handleFinishEditing() {
    LogViewActionCreators.submitEditingLog(this.props.log);
  },

  handleClickWholeLog(e: Object) {
    e.preventDefault();
    LogViewActionCreators.toggleViewLogOptions(this.props.log);
  },

  render(): any {
    var log = this.props.log;

    var classes = classSet({
      "log__body-link": true,
      "log__body-link--viewing-options": log.get('isViewingOptions')
    });

    var options = log.get('isViewingOptions') && !log.get('isConfirmingRemove') ?
      <div className="log__options">
        <Btn href="#" onClick={this.handleToggleEdit}>
          Edit
        </Btn>
        {' '}
        <Btn href="#"
          onClick={this.handleClickRemove}
          inverse={true}>
          Remove
        </Btn>
      </div> : null;

    var confirmRemove = log.get('isConfirmingRemove') ?
      <div className="log__options">
        <Btn href="#"
          onClick={this.handleConfirmRemove}>
          You sure? Super sure?
        </Btn>
        {' '}
        <Btn href="#"
          inverse={true}
          onClick={this.handleClickRemove}>
          Cancel
        </Btn>
      </div> : null;

    var content = log.get('isEditing') ?
      <div>
        <WriteLog value={log.get('editingValue')}
          onChange={this.handleChangeValue}
          onFinish={this.handleFinishEditing}
        />
        <WriteLogOptions onSave={this.handleFinishEditing}
          onCancel={this.handleToggleEdit}
        />
      </div> :
      <div>
        <div className="log__disc" dangerouslySetInnerHTML={{__html: '&mdash;'}}></div>
        <a className={classes}
          href="#"
          onClick={this.handleClickWholeLog}
          dangerouslySetInnerHTML={{__html: inputUtils.nl2br(log.get('log'))}}>
        </a>
        {options}
        {confirmRemove}
      </div>;

    return (
      <div className="log">
        {content}
      </div>
    );
  }
});

module.exports = Log;
