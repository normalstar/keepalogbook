/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var StoresMixin = require('../StoresMixin');
var DayStore = require('../Day/DayStore');
var Day = require('../Day/Day');
var dateUtils = require('../shared/dateUtils');

var FrontDayHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, callback) {
      DayStore.initialize(dateUtils.getCurrentDayKey());
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
    // We only have to check for auth here because this is the default route.
    // Other components will be explicitly inside/outside.
    if (!this.props.user.get('auth')) {
      return null;
    }

    return (
      <div>
        Front day
        <Day day={this.state.day} />
      </div>
    );
  }
});

module.exports = FrontDayHandler;
