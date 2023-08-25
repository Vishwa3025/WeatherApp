import React, { useState } from "react";
import "../search.css";
import "../App.css";

function Search() {
  const apiKey = "f19856fbe2aa9e1939c69f2d8bd2422e";
  const [weatherData, setweatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setweatherData(data);
          setCity("");
          console.log(data);
        });
    }
  };

  // Date;
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default", { month: "long" });
  let day = d.toLocaleDateString("default", { weekday: "long" });

  //Temperature
  let temp = 0;
  let temp_min = 0;
  let temp_max = 0;
  if (weatherData.main) {
    temp = (weatherData.main.temp - 273.15).toFixed(2);
    temp_min = (weatherData.main.temp_min - 273.15).toFixed(2);
    temp_max = (weatherData.main.temp_max - 273.15).toFixed(2);
  }

  let emoji = null;
  if (weatherData.main) {
    if (weatherData.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (weatherData.weather[0].main === "Thunderstorm") {
      emoji = "	fa-bolt";
    } else if (weatherData.weather[0].main === "Drizzle") {
      emoji = "fa-umbrella";
    } else if (weatherData.weather[0].main === "Rain") {
      emoji = "fa-cloud-rain";
    } else if (weatherData.weather[0].main === "Snow") {
      emoji = "fa-snowflake";
    } else {
      emoji = "fa-smog";
    }
  }

  return (
    <div className="bg-scroll">
      <div className="gradient">
        <div className="container text-center h-screen p-10 ">
          <input
            className="p-2 w-[300px] text-blue-900 bg-white rounded-lg"
            placeholder="Enter City..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          />

          {weatherData.main ? (
            <div className="">
              <div className="flex justify-center items-center w-full ">
                <div className="w-1/2 h-[700px] relative overflow-hidden flex justify-center items-center">
                  <div className="absolute w-2/3 inset-y-24 opacity-60 bg-black text-white text-xl text-center">
                    <p className="p-5 text-5xl font-semibold">
                      {weatherData.name}, {weatherData.sys.country}
                    </p>
                    <p className="text-2xl p-2 font-medium">
                      {day}, {month} {date}, {year}
                    </p>
                    <p className="p-2 text-lg">Last updated 3 min ago.</p>
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <p className="text-4xl font-bold">{temp}&deg;C</p>
                    <p className="pt-10 font-semibold text-3xl">
                      {weatherData.weather[0].main}
                    </p>
                    <p className="text-2xl font-light p-2">
                      {temp_min} &deg;C | {temp_max} &deg;C
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="p-10 text-2xl text-black">
                Welcome to Weather app!.. Enter in a city to get the weather of.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
