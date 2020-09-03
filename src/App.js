import React, { useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { getWeatherForecastByLocation } from "./utils/api";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import { getTemperatureColor } from "./utils/colors";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [weatherIcon, setWeatherIcon] = useState();

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const forecast = await getWeatherForecastByLocation();

      setLoading(false);

      setWeatherIcon(forecast.weather[0].icon);
      setTemperature(forecast.main.temp);
    }
    catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <div className="app">
      <header>React Weather App! :)</header>
      <main style={{ background: getTemperatureColor(temperature) }}>
        {error && 
          <div className="message error">
            {error}
          </div>
        }
        {!weatherIcon && (
          <div className="message">
            <p>
              In order to show you what weather is outside, this app needs to
              know your location.
            </p>
            {loading ? (
              <button disabled>Loading...</button>
            ) : (
              <button onClick={fetchWeatherData}>
                Ok, use my location and show me the weather!
              </button>
            )}
          </div>
        )}
        {weatherIcon && (
          <React.Fragment>
            <WeatherIcon code={weatherIcon} />
            <span className="degrees">{temperature} &deg;C</span>
            <Slider
              min={-50}
              max={50}
              value={temperature}
              tooltip={false}
              onChange={(value) => setTemperature(value)}
            />
          </React.Fragment>
        )}
      </main>
    </div>
  );
}

export default App;
