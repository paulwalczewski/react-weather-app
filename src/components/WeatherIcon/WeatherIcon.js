import React from "react";
import PropTypes from "prop-types";

const WeatherIcon = ({ code }) => (
  <img src={`http://openweathermap.org/img/w/${code}.png`} alt="Weather Icon" />
);

WeatherIcon.propTypes = {
  code: PropTypes.string.isRequired,
};

export default WeatherIcon;
