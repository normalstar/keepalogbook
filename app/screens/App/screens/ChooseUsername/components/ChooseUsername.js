'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var chooseUsernameActionCreators = require('../actions/chooseUsernameActionCreators');

var ChooseUsername = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    chooseUsername: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleChangeNewUsername: function(e) {
    chooseUsernameActionCreators.changeNewUsername(e.target.value);
  },

  render: function() {
    return (
      <div>
        ChooseUsername!

        <div>
          <input value={this.props.chooseUsername.newUsername}
            onChange={this.handleChangeNewUsername}
          />
        </div>
      </div>
    );
  }
});

module.exports = ChooseUsername;
