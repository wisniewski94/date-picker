import React from "react";
import "./App.css";
import Calendar from "./components/calendar";

function App() {
  return (
    <div className="App">
      <Calendar date={new Date()}></Calendar>
    </div>
  );
}

export default App;
