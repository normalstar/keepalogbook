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

    var momentDate = dateUtils.parseDayKey(this.props.day.getIn(['day', 'dayKey']));
    var prevDay = dateUtils.getPreviousDay(momentDate);
    var prevParams = dateUtils.getDayParams(prevDay);
    var prevLink = (
      <Link to="day" params={prevParams}>
        {dateUtils.formatMoment('ll')(prevDay)}
      </Link>
    );

    var nextDay = dateUtils.getNextDay(momentDate);
    var nextParams = dateUtils.getDayParams(nextDay);
    var isInFuture = dateUtils.isInFuture(nextDay);
    var nextLink = isInFuture ?
      null :
      <Link to="day" params={nextParams}>
        {dateUtils.formatMoment('ll')(nextDay)}
      </Link>;

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
          {prevLink}
          {nextLink}
        </div>
      </div>
    );
  }
});

module.exports = Day;
