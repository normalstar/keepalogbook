/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var compose = require('lodash/function/compose');

var StoresMixin = require('../StoresMixin');
var DayStore = require('../Day/DayStore');
var Day = require('../Day/Day');
var dateUtils = require('../shared/dateUtils');

var DayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, callback) {
      var { year, month, day } = params;
      var dayKey = year + month + day + '';
      var isValidDayKey = dateUtils.parseDayKey(dayKey).isValid();
      if (!isValidDayKey || year.length !== 4 || month.length !== 2 || day.length !== 2) {
        transition.redirect('frontDay');
      }
      DayStore.initialize(dayKey);
      callback();
    }
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [DayStore],

  getStateFromStores(): Object {
    return {
      day: DayStore.get()
    };
  },

  render(): any {
    var displayDate = compose(dateUtils.formatMoment('ll'), dateUtils.parseDayKey);

    return (
      <div>
        {displayDate(this.state.day.getIn(['day', 'dayKey']))}
        <Day day={this.state.day} />
      </div>
    );
  }
});

module.exports = DayHandler;
