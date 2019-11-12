import React, { Component } from "react";
import {
  dateObject,
  getPreviousMonth,
  getNextMonth
} from "./../utils/dateParser";
import "../styles/calendarHeader.sass";
import ArrowLeft from "./icons/arrowLeft";
import ArrowRight from "./icons/arrowRight";

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    const { year, month } = this.props;
    this.holder = undefined;
    this.state = { monthName: this.getMonth(month), year, month };
  }

  getMonth = month => {
    const { calendarMonths } = dateObject;
    return Object.keys(calendarMonths)[month - 1];
  };

  setPrevMonth = () => {
    const { month, year } = this.props;
    const monthName = this.getMonth(getPreviousMonth(month, year).month);
    this.props.currentDate({ ...getPreviousMonth(month, year) });
    this.setState({ monthName });
  };

  setNextMonth = () => {
    const { month, year } = this.props;
    const monthName = this.getMonth(getNextMonth(month, year).month);
    this.props.currentDate({ ...getNextMonth(month, year) });
    this.setState({ monthName });
  };

  setPrevYear = () => {
    const { year } = this.props;
    this.props.currentDate({ year: year - 1 });
  };

  setNextYear = () => {
    const { year } = this.props;
    this.props.currentDate({ year: year + 1 });
  };

  handlePrev = event => {
    event && event.preventDefault();
    const fn = event.shiftKey ? this.setPrevYear : this.setPrevMonth;
    this.handleHolder(fn);
  };

  handleNext = event => {
    event && event.preventDefault();
    const fn = event.shiftKey ? this.setNextYear : this.setNextMonth;
    this.handleHolder(fn);
  };

  handleHolder = fn => {
    fn();
    this.holder = setInterval(fn, 200);
  };

  handleClear = () => {
    clearInterval(this.holder);
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <button
          onMouseDown={this.handlePrev}
          onMouseUp={this.handleClear}
          onMouseLeave={this.handleClear}
          className="arrow"
        >
          <ArrowLeft />
        </button>
        <strong>
          {`${this.state.monthName} `}
          {`${this.props.year}`}
        </strong>
        <button
          onMouseDown={this.handleNext}
          onMouseUp={this.handleClear}
          onMouseLeave={this.handleClear}
          className="arrow">
          <ArrowRight />
        </button>
      </div>
    );
  }
}

export default CalendarHeader;
