import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getCityData, get5DaysForecast } from '../Store/Slices/WeatherSlice.js';
import './Weather1.css';

function Weather1() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const loc = params.get('loc') || '';
  const dispatch = useDispatch();

  const {
    citySearchData,
    forecastData,
    citySearchLoading,
    forecastLoading,
    forecastError,
  } = useSelector((state) => state.weather);

  const [search, setSearch] = useState(loc);

  useEffect(() => {
    if (loc) {
      setSearch(loc);
      dispatch(getCityData({ city: loc, unit: 'metric' }));
    }
  }, [loc, dispatch]);

  useEffect(() => {
    if (citySearchData && citySearchData.data) {
      const { lat, lon } = citySearchData.data.coord;
      dispatch(get5DaysForecast({ lat, lon, unit: 'metric' }));
    }
  }, [citySearchData, dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getCityData({ city: search, unit: 'metric' }));
    setSearch('');
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Map date to day of the week and return both the day and date
  const getDayAndDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return { day, formattedDate };
  };

  // Group forecast data by day of the week
  const groupByDay = (list) => {
    if (!Array.isArray(list)) {
      console.error("Expected an array for forecast data list, but got:", list);
      return {};
    }

    return list.reduce((acc, item) => {
      const { day, formattedDate } = getDayAndDate(item.dt_txt);
      if (!acc[day]) {
        acc[day] = { items: [], date: formattedDate };
      }
      acc[day].items.push(item);
      return acc;
    }, {});
  };

  const groupedForecastData = Object.entries(groupByDay(forecastData?.list || [])).slice(1, 6);

  return (
    <div className="body-container">
      <div className="weather-container">
        <h3>Enter Another Location</h3>
        <div className="input-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Enter city/town..."
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {citySearchLoading ? (
          <p>Loading current weather...</p>
        ) : (
          citySearchData && citySearchData.data && (
            <div className="weather-details">
              <h2>Hello {name}!</h2>
              <h2>Weather in {citySearchData.data.name}</h2>
              <p>Temperature: {citySearchData.data.main.temp} °C / {Math.round(citySearchData.data.main.temp * 9/5 + 32)} °F</p>
              <p>Humidity: {citySearchData.data.main.humidity}%</p>
              <p>Weather Description: {citySearchData.data.weather[0].description}</p>
              <p>Wind Speed: {citySearchData.data.wind.speed} m/s</p>
              {citySearchData.data.wind.deg && <p>Wind Direction: {citySearchData.data.wind.deg}°</p>}
              <img
                src={getWeatherIcon(citySearchData.data.weather[0].icon)}
                alt={citySearchData.data.weather[0].description}
                className="weather-icon"
              />
              {/* <Link to="/PreviousWeekWeather">View Previous Week's Weather</Link> */}
            </div>
          )
        )}

        {forecastLoading ? (
          <p>Loading forecast...</p>
        ) : forecastError ? (
          <p>Error loading forecast: {forecastError}</p>
        ) : (
          groupedForecastData.length > 0 && (
            <div className="forecast-container">
              <div className="forecast-list">
                {groupedForecastData.map(([day, data], index) => (
                  <div key={index} className="forecast-item">
                    <p>{day} - {data.date}</p>
                    <p>{data.items[0].main.temp} °C</p>
                    <img
                      src={getWeatherIcon(data.items[0].weather[0].icon)}
                      alt={data.items[0].weather[0].description}
                      className="forecast-icon"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Weather1;
