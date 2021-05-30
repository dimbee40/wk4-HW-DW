import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");

  function handleResponse(response) {
    console.log(response);
    setTemperature(
      <li>
        Current temperature in {city} is {Math.round(response.data.main.temp)}{" "}
        °C
      </li>
    );
    setDescription(
      <li>Description: {response.data.weather[0].description}</li>
    );
    setWind(<li>Windspeed: {response.data.wind.speed} km/h</li>);
    setHumidity(<li>Humidity:{Math.round(response.data.main.humidity)}%</li>);
    let iconURL = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    setIcon(
      <li>
        {" "}
        <img src={iconURL} alt={description} />{" "}
      </li>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let api = "3ec119a7b4622feedeeba843b106eb0a";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function changeCity(event) {
    setCity(event.target.value);
    console.log(city);
  }

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city" onChange={changeCity} />
        <input type="submit" value="Search" />
      </form>
      <p>{temperature}</p>
      <p>{wind}</p>
      <p>{humidity}</p>
      <p>{description}</p>
      <p>{icon}</p>
      <p>Coded by Dimbee</p>
    </div>
  );
}
