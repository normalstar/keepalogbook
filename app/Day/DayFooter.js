/**
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { Link } = require('react-router');
var dateUtils = require('../shared/dateUtils');
var DayViewActionCreators = require('./DayViewActionCreators');

require ('./DayFooter.less');

var DayFooter = React.createClass({
  propTypes: {
    day: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleClickCalendar(e: Object) {
    e.preventDefault();
    DayViewActionCreators.toggleCalendar();
  },

  render(): any {
    var momentDate = dateUtils.parseDayKey(this.props.day.getIn(['day', 'dayKey']));
    var prevDay = dateUtils.getPreviousDay(momentDate);
    var prevParams = dateUtils.getDayParams(prevDay);
    var prevLink = (
      <Link to="day" params={prevParams}>
        {dateUtils.formatMoment('ll')(prevDay)}
      </Link>
    );

    var nextDay = dateUtils.getNextDay(momentDate);
    var nextParams = dateUtils.getDayParams(nextDay);
    var isInFuture = dateUtils.isInFuture(nextDay);
    var nextLink = isInFuture ?
      null :
      <Link to="day" params={nextParams}>
        {dateUtils.formatMoment('ll')(nextDay)}
      </Link>;

    var nextLabel = nextLink ?
      <span className="day-footer__link__label">
        Next day
      </span> : null;

    return (
      <div className="day-footer">
        <span className="day-footer__link day-footer__link--previous">
          <span className="day-footer__link__label">
            Previous day
          </span>
          {prevLink}
        </span>
        <span className="day-footer__link day-footer__link--next">
          {nextLabel}
          {nextLink}
        </span>
        <div className="day-footer__calendar">
          <a href="#"
            onClick={this.handleClickCalendar}
            className="day-footer__calendar__button day-footer__calendar__button--toggle">
            <span className="icon-calendar day-footer__calendar__button-icon"/>
          </a>

          <Link to="calendar"
            className="day-footer__calendar__button day-footer__calendar__button--link">
            <span className="icon-calendar day-footer__calendar__button-icon"/>
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = DayFooter;
