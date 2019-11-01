import React from "react";
import { dateObject } from "./../utils/dateParser";

const CalendarLable = () => {
  return (
    <div>
      {Object.keys(dateObject.weekDays).map(e => (
        <div key={e}>{dateObject.weekDays[e].toUpperCase()}</div>
      ))}
    </div>
  );
};

export default CalendarLable;
