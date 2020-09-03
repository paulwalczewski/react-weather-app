import { weatherApiKey } from "./../config";
import { getUserLocation } from "./location";

const request = async (url) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const getWeatherForecast = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

  return request(url);
};

const getWeatherForecastByLocation = async () => {
  try {
    const position = await getUserLocation();
    const { latitude, longitude } = position.coords;
    const forecast = await getWeatherForecast(latitude, longitude);

    return forecast;
  } catch (error) {
    throw error
  }
};

export { getWeatherForecastByLocation };
