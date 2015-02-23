/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler, Navigation, State } = require('react-router');
var isEmpty = require('lodash/lang/isEmpty');

var AppHandlerActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');
var StoresMixin = require('../StoresMixin');
var Inside = require('../Inside/Inside');
var Outside = require('../Outside/Outside');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      AppHandlerActionCreators.loadApp();
      callback();
    }
  },

  stores: [UserStore],

  mixins: [StoresMixin, Navigation, State],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  componentDidMount() {
    var params = this.getParams();
    var pathname = this.getPathname();
    if ((pathname.indexOf('today') === -1 || isEmpty(params)) && this.state.user.get('auth')) {
      this.replaceWith('today');
    } else if ((pathname.indexOf('today') > -1 || !isEmpty(params)) && !this.state.user.get('auth')) {
      this.replaceWith('front');
    }
  },

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!prevState.user.get('auth') && this.state.user.get('auth')) {
      this.replaceWith('today');
    } else if (prevState.user.get('auth') && !this.state.user.get('auth')) {
      this.replaceWith('front');
    }
  },

  render()/*: any*/ {
    var insideHandler = this.state.user.get('user') ?
      <RouteHandler user={this.state.user} key='inside' /> : null;

    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        {insideHandler}
      </Inside> :
      <Outside user={this.state.user}>
        <RouteHandler key='outside' />
      </Outside>;

    return (
      <div className="app-handler">
        {content}
      </div>
    );
  }
});

module.exports = AppHandler;
