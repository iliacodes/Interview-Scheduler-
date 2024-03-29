import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";


export default function DayListItem(props) {
  const formatSpots = function(num) {
    if (num === 0) {
      return "no spots remaining";
    }

    else if (num === 1) {
      return `${props.spots} spot remaining`;
    }

    else {
      return `${props.spots} spots remaining`;
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}