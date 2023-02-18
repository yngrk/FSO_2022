import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const getLocationData = (city) => {
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    )
    .then((resolve) => resolve.data);
};

const getWeatherData = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
    .then((resolve) => resolve.data);
};

const getWeatherConditionIcon = (code) => {
  return axios.get(`http://openweathermap.org/img/wn/${code}@2x.png`);
};

export { getLocationData, getWeatherData, getWeatherConditionIcon };
