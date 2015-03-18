/**
 * List of logs for a day.
 *
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var DayFooter = require('./DayFooter');
var DayViewActionCreators = require('./DayViewActionCreators');
var Log = require('../Log/Log');
var LogViewActionCreators = require('../Log/LogViewActionCreators');
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
    if (nextProps.day.getIn(['day', 'dayUniqueId']) !== this.props.day.getIn(['day', 'dayUniqueId'])) {
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

  handleRemoveLog(log: Object) {
    LogViewActionCreators.removeLog(
      log,
      this.props.day.get('day'),
      this.props.day.get('logs').size
    );
  },

  render(): any {
    var logs = this.props.day.get('logs').map(log =>
      <Log key={log.get('key')}
        log={log}
        onRemove={this.handleRemoveLog}
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
