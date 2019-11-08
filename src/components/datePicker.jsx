import React, { Component } from "react";
import Calendar from "./calendar";
import { isSameDay, isDate, findNextDay } from "./../utils/dateParser";
import Input from "./common/input";
import "../styles/datePicker.sass";

class DatePicker extends Component {
  state = {
    from: "",
    to: "",
    data: { from: "", to: "" },
    available: [
      [2019, "11", "04"],
      [2019, "11", "05"],
      [2019, "11", "06"],
      [2019, "11", "07"],
      [2019, "11", "10"],
      [2019, "11", "11"]
    ],
    opened: ""
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleChange = ({ currentTarget: input }) => {
    const val = input.value;
    const re = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    const stateData = { ...this.state.data };
    if (re.test(val)) {
      const res = val.split("-");
      if (input.name === "from") this.handleFrom(res);
      if (input.name === "to") this.handleTo(res);
    } else {
      if (input.name === "from") {
        stateData["from"] = "";
        this.setState({ from: "", data: stateData });
      }
      if (input.name === "to") {
        stateData["to"] = "";
        this.setState({ to: "", data: stateData });
      }
    }
    const data = { ...this.state.data };
    data[input.name] = val;
    this.setState({ data });
  };

  validate = (data, direction) => {
    if (data === undefined || data === "") return;
    const _date = new Date(data.join("-"));
    const { from, available, to } = this.state;
    let isDirection, isInRange, isStringEmpty;
    if (direction === "from") {
      isDirection = _date <= to;
      isInRange = findNextDay(available, _date, to);
      isStringEmpty = to === "";
    } else if (direction === "to") {
      isDirection = _date >= from;
      isInRange = findNextDay(available, from, _date);
      isStringEmpty = from === "";
    }
    return (isDirection || isStringEmpty) && (isInRange || isStringEmpty);
  };

  handleFrom = data => {
    const _date = new Date(data.join("-"));
    this.validate(data, "from");
    const { from } = this.state;
    const stateData = { ...this.state.data };
    if (!isSameDay(_date, from) && this.validate(data, "from")) {
      stateData["from"] = this.parseDate(_date);
      this.setState({
        from: _date,
        data: stateData
      });
    } else if (isSameDay(_date, from)) {
      stateData["from"] = "";
      this.setState({ from: "", data: stateData });
    }
  };

  handleTo = data => {
    const _date = new Date(data.join("-"));
    const { to } = this.state;
    const stateData = { ...this.state.data };
    if (!isSameDay(_date, to) && this.validate(data, "to")) {
      stateData["to"] = this.parseDate(_date);
      this.setState({
        to: _date,
        data: stateData
      });
    } else if (isSameDay(_date, to)) {
      stateData["to"] = "";
      this.setState({ to: "", data: stateData });
    }
  };

  parseDate = date => {
    if (!isDate(date)) return;
    return date.toISOString().substring(0, 10);
  };

  handleClick = ({ currentTarget: input }) => {
    //if (this.refs[input.name] === undefined) return;
    console.log(this.refs[input.name]);
    // if (this.refs[input.name].contains(input)) {
    //   console.log("inside");
    //   return;
    // }
    // console.log("outside");
    //this.setState({ opened: input.name });
  };

  render() {
    return (
      <>
        <div className="inline">
          <Input
            className={""}
            label={"Check In"}
            name={"from"}
            type={"text"}
            size={10}
            maxLength={10}
            value={this.state.data.from}
            onClick={this.handleClick}
            onChange={this.handleChange}
          />
          <Calendar
            ref="from"
            className={this.state.opened === "from" ? "visible" : "invisible"}
            current={this.state.from}
            second={this.state.to}
            handleCurrentChange={this.handleFrom}
            date={new Date()}
            available={this.state.available}
          ></Calendar>
          <Input
            className={""}
            label={"Check Out"}
            name={"to"}
            size={10}
            maxLength={10}
            type={"text"}
            onClick={this.handleClick}
            value={this.state.data.to}
            onChange={this.handleChange}
          />
          <Calendar
            ref="to"
            className={this.state.opened === "to" ? "visible" : "invisible"}
            current={this.state.to}
            second={this.state.from}
            handleCurrentChange={this.handleTo}
            date={new Date()}
            available={this.state.available}
          ></Calendar>
        </div>
      </>
    );
  }
}

export default DatePicker;
