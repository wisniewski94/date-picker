import React, { Component } from "react";
import PropTypes from "prop-types";
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS
} from "../utils/dateParser";

class Calendar extends Component {
  state = { ...this.resolveStateFromProp(), today: new Date() };

  resolveStateFromDate(date) {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();

    return {
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear()
    };
  }

  resolveStateFromProp() {
    return this.resolveStateFromDate(this.props.date);
  }

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    const calendarMonth = month || +current.getMonth() + 1;
    const calendarYear = year || current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };
  // Render the month and year header with arrow controls
  // for navigating through months and years
  renderMonthAndYear = () => {
    const { month, year } = this.state;

    // Resolve the month name from the CALENDAR_MONTHS object map
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];

    return (
      <div>
        <div
          onMouseDown={this.handlePrevious}
          onMouseUp={this.clearPressureTimer}
          title="Previous Month"
        />

        <div>
          {monthname} {year}
        </div>

        <div
          onMouseDown={this.handleNext}
          onMouseUp={this.clearPressureTimer}
          title="Next Month"
        />
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.renderMonthAndYear()}

        <div>{}</div>

        <div>{}</div>
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func
};

export default Calendar;
