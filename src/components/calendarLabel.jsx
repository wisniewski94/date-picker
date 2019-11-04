import React from "react";
import { dateObject } from "./../utils/dateParser";

const CalendarLable = () => {
  return (
    <tr>
      {Object.keys(dateObject.weekDays).map(e => (
        <th key={e}>{dateObject.weekDays[e].toUpperCase()}</th>
      ))}
    </tr>
  );
};

export default CalendarLable;
