import React from "react";

export default function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil. {props.currentTempC}</p>;
  }
  return <p>The water would not boil. {props.currentTempC}</p>;
}
