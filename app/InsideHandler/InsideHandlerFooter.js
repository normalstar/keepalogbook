/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var InsideHandlerViewActionCreators = require('./InsideHandlerViewActionCreators');

require('./InsideHandlerFooter.less');

var InsideHandlerFooter = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleClickLogOut(e: Object) {
    e.preventDefault();
    InsideHandlerViewActionCreators.logOut();
  },

  render(): any {
    return (
      <div className="inside-handler-footer">
        {this.props.user.getIn(['user', 'meta', 'displayName'])}
        <div>
          <a href="#" onClick={this.handleClickLogOut}>
            Log out
          </a>
        </div>
      </div>
    );
  }
});

module.exports = InsideHandlerFooter;
