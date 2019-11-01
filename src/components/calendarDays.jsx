import React, { Component } from "react";
import calendar, {
  dateObject,
  isDate,
  isSameMonth,
  isSameDay
} from "../utils/dateParser";

class CalendarDays extends Component {
  state = { calendar: [] };
  getCalendarDates = () => {
    const { month, year } = this.props;
    console.log(month, year);
    return calendar(month, year);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("UPDATE");
  }

  renderDay = (date, index) => {
    const { current, month, year, today } = this.props;
    const _date = new Date(date.join("-"));
    const isToday = isSameDay(_date, today);
    const isCurrent = isSameDay(_date, current);
    const inMonth = isSameMonth(_date, new Date([year, month, 1].join("-")));
    let className;
    if (isToday) {
      className = "today";
    } else if (isCurrent) {
      className = "current";
    } else if (inMonth) {
      className = "inMonth";
    } else {
      className = "day";
    }
    return (
      <div className={className} key={date[2] + date[1]}>
        {date[2]}
      </div>
    );
    //const onClick = this.props.goToDate(_date);
  };
  componentDidMount() {
    console.log("RENDERING2");
    this.setState({ calendar: this.getCalendarDates() });
  }
  render() {
    console.log("RENDERING");
    return (
      <React.Fragment>{this.state.calendar.map(this.renderDay)}</React.Fragment>
    );
  }
}

export default CalendarDays;
