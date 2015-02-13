'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var Register = require('./Register');

var Front = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  mixins: [PureRenderMixin],

  componentWillMount: function() {
    this._redirectIfLoggedIn();
  },

  componentDidUpdate: function() {
    this._redirectIfLoggedIn();
  },

  _redirectIfLoggedIn: function() {
    if (this.props.user.get('auth').has('auth')) {
      console.log('this guy is logged in:', this.props.user.get('auth').get('uid'));
    } else {
      console.log('this guy aint logged in');
    }
  },

  render: function() {
    return (
      <div>
        Front!
        <div>
          <Register />
        </div>
      </div>
    );
  }
});

module.exports = Front;
