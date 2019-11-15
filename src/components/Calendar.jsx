import React, { Component } from "react";
import PropTypes from "prop-types";
import CalendarHeader from "./calendarHeader";
import CalendarLabel from "./calendarLabel";
import CalendarDays from "./calendarDays";
import "../styles/calendar.sass";

class Calendar extends Component {
  constructor(props) {
    super(props);

    const { date } = props;

    this.state = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      today: new Date()
    };
  }

  handleDateChange = date => {
    this.setState(date);
  };

  render() {
    const { month, year, today } = this.state;
    const { current, available, second, className } = this.props;
    return (
      <div className={className + " date-picker"}>
        <CalendarHeader
          month={month}
          year={year}
          currentDate={this.handleDateChange}
        />
        <table>
          <tbody>
            <CalendarLabel></CalendarLabel>
            <CalendarDays
              month={month}
              year={year}
              today={today}
              current={current}
              second={second}
              available={available}
              handleCurrent={this.props.handleCurrentChange}
            ></CalendarDays>
          </tbody>
        </table>
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  current: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  second: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handleCurrentChange: PropTypes.func,
  available: PropTypes.array
};

export default Calendar;
