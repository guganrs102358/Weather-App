import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './Slices/WeatherSlice';
import previousWeekWeatherReducer from './Slices/PreviousWeekWeatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    previousWeekWeather: previousWeekWeatherReducer,
  },
});

export default store;
