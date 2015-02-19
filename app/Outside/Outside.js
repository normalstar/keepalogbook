/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { RouteHandler, Navigation } = require('react-router');

var OutsideHeader = require('./OutsideHeader');

require('./Outside.less');

var Outside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin, Navigation],

  _redirectIfLoggedIn() {
    if (this.props.user.get('auth')) {
      this.replaceWith('today');
    }
  },

  componentDidMount() {
    this._redirectIfLoggedIn();
  },

  componentDidUpdate(prevProps: Object) {
    if (!prevProps) { return; }
    this._redirectIfLoggedIn();
  },

  render(): any {
    return (
      <div className="outside">
        <OutsideHeader />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Outside;
