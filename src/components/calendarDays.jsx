import React, { Component } from "react";
import calendar, {
import SingleDay from './singleDay';
  dateObject,
  isDate,
  isSameMonth,
  isSameDay
} from "../utils/dateParser";

class CalendarDays extends Component {
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
        items.push(
          <td key={"cal" + iterator}>{this.renderDay(calendar[iterator])}</td>
        );
        iterator++;
      }
      rows.push(<tr key={"row" + iterator}>{items}</tr>);
    }
    return rows;
  }
  renderDay = date => {
    if (date === undefined) return;
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
      <SingleDay className={className} key={date[2] + date[1]}>
        {date[2]}
      </SingleDay>
    );
    //const onClick = this.props.goToDate(_date);
  };
  componentDidMount() {}
  render() {
    return <>{this.renderCalendarGrid()}</>;
  }
}

export default CalendarDays;
