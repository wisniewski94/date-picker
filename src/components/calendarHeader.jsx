import React, { Component } from "react";
import {
  dateObject,
  getPreviousMonth,
  getNextMonth
} from "./../utils/dateParser";

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
    const { month, year } = this.state;
    const monthName = this.getMonth(getPreviousMonth(month, year).month);
    this.setState({ monthName, ...getPreviousMonth(month, year) });
  };

  setNextMonth = () => {
    const { month, year } = this.state;
    const monthName = this.getMonth(getNextMonth(month, year).month);
    this.setState({ monthName, ...getNextMonth(month, year) });
  };

  setPrevYear = () => {
    const { year } = this.state;
    this.setState({ year: year - 1 });
  };

  setNextYear = () => {
    const { year } = this.state;
    this.setState({ year: year + 1 });
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
        >
          Previous
        </button>

        {`${this.state.monthName} `}
        {`${this.state.year}`}

        <button
          onMouseDown={this.handleNext}
          onMouseUp={this.handleClear}
          onMouseLeave={this.handleClear}
        >
          Next
        </button>
      </div>
    );
  }
}

export default CalendarHeader;
