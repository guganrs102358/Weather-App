import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHistoricalWeather } from '../Store/Slices/PreviousWeekWeatherSlice';

const PreviousWeekWeather = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && startDate && endDate) {
      dispatch(fetchHistoricalWeather({ location, startDate, endDate }));
    }
  };

  return (
    <div>
      <h2>Previous Week Weather</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default PreviousWeekWeather;
