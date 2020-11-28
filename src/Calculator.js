import React, { Component } from "react";
import TemperatureInput from "./TemperatureInput";
import BoilingVerdict from "./BoilingVerdict";
import axios from "axios";

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: "c", data: "" };
  }

  handleClick = () => {
    axios.get("https://api.kanye.rest").then((res) => {
      this.setState({ data: res.data.quote });
    });
  };

  handleCelsiusChange = (temperature) => {
    this.setState({ scale: "c", temperature: temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: "f", temperature });
  };

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <button onClick={this.handleClick}>get post</button>
        <p>{this.state.data}</p>
        <BoilingVerdict
          currentTempC={this.state.data}
          celsius={parseFloat(celsius)}
        />
      </div>
    );
  }
}
