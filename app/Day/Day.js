/**
 * List of logs for a day.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { Link } = require('react-router');

var DayViewActionCreators = require('./DayViewActionCreators');
var Log = require('../Log/Log');
var WriteLog = require('../Log/WriteLog');
var dateUtils = require('../shared/dateUtils');

var Day = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount() {
    DayViewActionCreators.listenToDay(this.props.day.get('day'));
  },

  componentWillUnmount() {
    DayViewActionCreators.stopListeningToDay(this.props.day.get('day'));
  },

  handleChangeCurrentLog(e: Object) {
    DayViewActionCreators.changeCurrentLog(e.target.value);
  },

  handleFinishCurrentLog() {
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

    var yesterdayParams = dateUtils.getYesterdayLinkParams();

    return (
      <div>
        {logs}
        <div>
          <WriteLog value={this.props.day.get('currentLog')}
            onChange={this.handleChangeCurrentLog}
            onFinish={this.handleFinishCurrentLog}
          />
        </div>
        <div>
          <Link to="day" params={yesterdayParams}>
            Yesterday
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Day;
