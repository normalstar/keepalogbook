/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { RouteHandler } = require('react-router');

var StoresMixin = require('../StoresMixin');
var UserStore = require('../User/UserStore');
var Inside = require('../Inside/Inside');
var Outside = require('../Outside/Outside');

var FrontHandler = React.createClass({
  mixins: [StoresMixin, PureRenderMixin],

  stores: [UserStore],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  render(): any {
    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        <RouteHandler user={this.state.user} />
      </Inside> :
      <Outside>
        <RouteHandler user={this.state.user} />
      </Outside>;

    return (
      <div>
        {content}
      </div>
    );
  }
});

module.exports = FrontHandler;
