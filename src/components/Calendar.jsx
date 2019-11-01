import React, { Component } from "react";
import PropTypes from "prop-types";
import calendar, { dateObject, isDate } from "../utils/dateParser";
import CalendarHeader from "./calendarHeader";
import CalendarLabel from "./calendarLabel";
import CalendarDays from "./calendarDays";
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

  handleDateChange = date => {
    this.setState(date);
  };

  render() {
    const { month, year, today, current } = this.state;
    return (
      <div>
        <CalendarHeader
          month={month}
          year={year}
          currentDate={this.handleDateChange}
        ></CalendarHeader>
        <CalendarLabel></CalendarLabel>
        <CalendarDays
          month={month}
          year={year}
          today={today}
          current={current}
        ></CalendarDays>
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onDateChanged: PropTypes.func
};

export default Calendar;
