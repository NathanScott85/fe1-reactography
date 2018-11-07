import React from "react";
import "./css/style.css";
const Events = ({ events }) => {
  return (
    <ul>
      {" "}
      {events.map(event => {
        return (
          <div>
            <li className="link">
              {event.name}
              {event.info}
            </li>
            <br />
            <li className="link">
              <img className="images" src={event.image} />
            </li>
          </div>
        );
      })}{" "}
    </ul>
  );
};

export default Events;
