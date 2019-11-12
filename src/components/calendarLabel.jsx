import React from "react";
import { dateObject } from "./../utils/dateParser";
import "../styles/calendarLabel.sass";

const CalendarLable = () => {
  return (
    <tr className="label">
      {Object.keys(dateObject.weekDays).map(e => (
        <th key={e}>{dateObject.weekDays[e]}</th>
      ))}
    </tr>
  );
};

export default CalendarLable;
