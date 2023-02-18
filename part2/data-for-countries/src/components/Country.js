import { useEffect, useState } from "react";
import * as weatherService from "../services/weatherService";

const Country = ({ data, active }) => {
  const mockWeather = {
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    main: {
      temp: 281.38,
      humidity: 70,
    },
    wind: {
      speed: 1.53,
    },
  };

  // state: if active -> show expanded information
  const [isActive, setIsActive] = useState(active);
  const [weatherData, setWeatherData] = useState(mockWeather);

  // fetch weather data
  useEffect(() => {
    if (isActive) {
      weatherService
        .getLocationData(data.capital)
        .then((location) => location[0])
        .then((coords) => {
          return weatherService.getWeatherData(coords.lat, coords.lon);
        })
        .then((weather) => setWeatherData(weather))
        .catch((error) => console.log("error"));
    }
  });

  // update rerender on active change
  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const collapse = () => {
    setIsActive(false);
  };

  const expand = () => {
    setIsActive(true);
  };

  if (isActive)
    return (
      <div className="country-tile" onClick={collapse}>
        <div className="title-bar">
          <div>
            {data.flag ? data.flag : "N/A"}{" "}
            {data.name.official ? data.name.official : "N/A"}
          </div>
          <button className="expand" onClick={collapse}>
            collapse
          </button>
        </div>
        <div className="expanded-info">
          <table>
            <tbody>
              <tr>
                <th>Region: </th>
                <td>{data.region ? data.region : "N/A"}</td>
              </tr>
              <tr>
                <th>Capital: </th>
                <td>{data.capital ? data.capital : "N/A"}</td>
              </tr>
              <tr>
                <th>Population: </th>
                <td>{data.population ? data.population : "N/A"}</td>
              </tr>
              <tr>
                <th>Languages: </th>
                <td>
                  <div className="group">
                    {data.languages
                      ? Object.keys(data.languages).map((lang) => (
                          <div key={lang}>{data.languages[lang]}</div>
                        ))
                      : "N/A"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="weather">
            <div className="title">Weather in {data.capital}</div>
            <div className="top">
              <img
                className="icon"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="weather icon"
              />
              <div>
                <div>{weatherData.weather[0].description}</div>
                <div>temp: {weatherData.main.temp}</div>
                <div>humidity: {weatherData.main.humidity}</div>
                <div>wind: {weatherData.wind.speed}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="country-tile" onClick={expand}>
        <div className="title-bar">
          <div>
            {data.flag} {data.name.official}
          </div>
          <button className="expand" onClick={expand}>
            expand
          </button>
        </div>
      </div>
    );
};

export default Country;
