/**
 * List of logs for a day.
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var dayViewActionCreators = require('actions/dayViewActionCreators');

var Log = require('components/Log');

var Day = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount: function() {
    dayViewActionCreators.listenToDay(this.props.day.get('day').toJS());
  },

  componentWillUnmount: function() {
    dayViewActionCreators.stopListeningToDay(this.props.day.get('day').toJS());
  },

  handleChangeCurrentLog: function(e) {
    dayViewActionCreators.changeCurrentLog(e.target.value);
  },

  /**
   * Submit on enter
   */
  handleKeyDownCurrentLog: function(e) {
    if (e.keyCode === 13) {
      dayViewActionCreators.submitCurrentLog(
        this.props.day.get('day').toJS(),
        this.props.day.get('currentLog'),
        this.props.day.get('logs').size
      );
    }
  },

  render: function() {
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
