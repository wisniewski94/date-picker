import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import calendar, { findDay, isSameMonth, isSameDay } from "../utils/dateParser";
import "../styles/calendarDays.sass";

class CalendarDays extends PureComponent {
  state = { calendar: calendar(this.props.month, this.props.year) };

  getCalendarDates = () => {
    const { month, year } = this.props;
    return calendar(month, year);
  };

  componentDidUpdate(prevProps, prevState) {
    const calendar = this.getCalendarDates();
    if (prevProps.month !== this.props.month) {
      this.setState({ calendar });
    }
  }

  renderCalendarGrid() {
    const { calendar } = this.state;
    if (calendar === undefined) return;
    let rows = [];
    let iterator = 0;
    for (let i = 0; i < 6; i++) {
      let items = [];
      for (let x = 0; x < 7; x++) {
        items.push(this.renderDay(calendar[iterator]));
        iterator++;
      }
      rows.push(<tr key={"row" + iterator}>{items}</tr>);
    }
    return rows;
  }

  renderDay = date => {
    //avoiding anonymous functions
    const handleCurrentChange = event => {
      this.props.handleCurrent(date);
    };
    if (date === undefined) return;
    const { current, month, year, today, available, second } = this.props;
    const _date = new Date(date.join("-"));
    const isAvailable = findDay(available, _date);
    const isToday = isSameDay(_date, today);
    const isSecond = isSameDay(_date, second);
    const isCurrent = isSameDay(_date, current);
    const inMonth = isSameMonth(_date, new Date([year, month, 1].join("-")));
    let className = "";
    if (isCurrent) {
      className = "current";
    } else if (isSecond) {
      className = "second";
    } else if (isAvailable) {
      className = "available";
    } else if (inMonth) {
      className = "day";
    }
    if (!inMonth) {
      className += " outMonth";
    }
    if (isToday) {
      className += " today";
    }

    return (
      <td
        onClick={handleCurrentChange}
        className={className}
        date={date}
        key={date[2] + date[1]}
      >
        {date[2]}
      </td>
    );
  };

  render() {
    return <>{this.renderCalendarGrid()}</>;
  }
}

CalendarDays.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  today: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  current: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  second: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  available: PropTypes.array,
  handleCurrent: PropTypes.func
};

export default CalendarDays;
