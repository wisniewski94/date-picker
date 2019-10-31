import React, { Component } from "react";
import PropTypes from "prop-types";
import calendar, { dateObject, isDate } from "../utils/dateParser";
import CalendarHeader from "./calendarHeader";

class Calendar extends Component {
  constructor(props) {
    super(props);

    const { date } = props;

    this.state = {
      current: date,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      today: new Date()
    };
  }

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    return calendar(month, year);
  };

  render() {
    const { month, year } = this.state;
    return (
      <div>
        <CalendarHeader month={month} year={year}></CalendarHeader>
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onDateChanged: PropTypes.func
};

export default Calendar;
