/**
 * List of logs for a day.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var DayFooter = require('./DayFooter');
var DayViewActionCreators = require('./DayViewActionCreators');
var Log = require('../Log/Log');
var WriteLog = require('../Log/WriteLog');
var WriteLogOptions = require('../Log/WriteLogOptions');

var Day = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount() {
    DayViewActionCreators.loadDay(this.props.day.get('day'));
  },

  componentWillUnmount() {
    DayViewActionCreators.unloadDay(this.props.day.get('day'));
  },

  componentWillUpdate(nextProps: any) {
    if (nextProps.day.getIn(['day', 'dayKey']) !== this.props.day.getIn(['day', 'dayKey'])) {
      DayViewActionCreators.unloadDay(this.props.day.get('day'));
      DayViewActionCreators.loadDay(nextProps.day.get('day'));
    }
  },

  handleChangeCurrentLog(e: Object) {
    DayViewActionCreators.changeCurrentLog(e.target.value);
  },

  handleFinishCurrentLog() {
    if (this.props.day.get('currentLog') === '') { return; }

    DayViewActionCreators.submitCurrentLog(
      this.props.day.get('day'),
      this.props.day.get('currentLog'),
      this.props.day.get('logs').size
    );
  },

  render(): any {
    var logs = this.props.day.get('logs').map(log =>
      <Log key={log.get('key')}
        log={log}
      />
    ).toArray();

    var options = this.props.day.get('currentLog') !== '' ?
      <WriteLogOptions onSave={this.handleFinishCurrentLog} /> : null;

    return (
      <div>
        {logs}
        <div>
          <WriteLog value={this.props.day.get('currentLog')}
            onChange={this.handleChangeCurrentLog}
            onFinish={this.handleFinishCurrentLog}
            isNewLog={true}
          />
          {options}
        </div>
        <DayFooter day={this.props.day} />
      </div>
    );
  }
});

module.exports = Day;
