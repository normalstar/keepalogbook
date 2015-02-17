/**
 * List of logs for a day.
 *
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var DayViewActionCreators = require('./DayViewActionCreators');

var Log = require('../Log/Log');

var Day = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount() {
    DayViewActionCreators.listenToDay(this.props.day.get('day').toJS());
  },

  componentWillUnmount() {
    DayViewActionCreators.stopListeningToDay(this.props.day.get('day').toJS());
  },

  handleChangeCurrentLog(e: Object) {
    DayViewActionCreators.changeCurrentLog(e.target.value);
  },

  /**
   * Submit on enter
   */
  handleKeyDownCurrentLog(e: Object) {
    if (e.keyCode === 13) {
      DayViewActionCreators.submitCurrentLog(
        this.props.day.get('day').toJS(),
        this.props.day.get('currentLog'),
        this.props.day.get('logs').size
      );
    }
  },

  render(): any {
    var logs = this.props.day.get('logs').map(function(log) {
      return (
        <Log key={log.get('key')}
          log={log}
        />
      );
    }).toArray();

    return (
      <div>
        <div>Day</div>
        {logs}
        <div>
          <input value={this.props.day.get('currentLog')}
            onChange={this.handleChangeCurrentLog}
            onKeyDown={this.handleKeyDownCurrentLog}
          />
        </div>
      </div>
    );
  }
});

module.exports = Day;
