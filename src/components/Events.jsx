import React from "react";
import "./css/events.css";
const Events = ({ events }) => {
  return (
    <ul>
      {events.map((event, i) => {
        return (
          <li key={i} className="name">
            {event.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Events;
