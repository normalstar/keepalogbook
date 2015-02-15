/**
 * List of logs for a day.
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { map } = require('utils/fpUtils').fp;

var StoresMixin = require('mixins/StoresMixin');
var dayStore = require('stores/dayStore');
var dayViewActionCreators = require('actions/dayViewActionCreators');

var Day = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    dayKey: PropTypes.string.isRequired
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [dayStore],

  getStateFromStores: function() {
    return {
      day: dayStore.get()
    };
  },

  componentWillMount: function() {
    dayStore.initialize();

    dayViewActionCreators.listenToDay(
      this.props.dayKey,
      this.props.user.get('user').toJS()
    );
  },

  componentWillUnmount: function() {
    dayViewActionCreators.stopListeningToDay(
      this.props.dayKey,
      this.props.user.get('user').toJS()
    );
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
        this.props.dayKey,
        this.props.user.get('user').toJS(),
        this.state.day.get('currentLog'),
        this.state.day.get('logs').size
      );
    }
  },

  render: function() {
    var logs = map(function(log) {
      return (
        <div key={log.key}>
          {log.value}
        </div>
      );
    }, this.state.day.get('logs').toArray());

    return (
      <div>
        Day
        {logs}
        <div>
          <input value={this.state.day.get('currentLog')}
            onChange={this.handleChangeCurrentLog}
            onKeyDown={this.handleKeyDownCurrentLog}
          />
        </div>
      </div>
    );
  }
});

module.exports = Day;
