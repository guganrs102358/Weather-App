import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const OPEN_CAGE_API_KEY = '89968bfb5873497fa50e1f98d3bc215d';
const GEOCODING_URL = 'https://api.opencagedata.com/geocode/v1/json';
const HISTORICAL_URL = 'https://api.tomorrow.io/v4/weather/realtime'; // Updated endpoint for demonstration

const getCoordinates = async (location) => {
  try {
    const response = await axios.get(`${GEOCODING_URL}?q=${encodeURIComponent(location)}&key=${OPEN_CAGE_API_KEY}`);
    if (response.data.results.length === 0) {
      throw new Error('No results found for the location');
    }
    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lon: lng };
  } catch (error) {
    throw new Error('Unable to fetch coordinates for the location');
  }
};

export const fetchHistoricalWeather = createAsyncThunk(
  'previousWeekWeather/fetchHistoricalWeather',
  async ({ location, startDate, endDate }, thunkAPI) => {
    try {
      const { lat, lon } = await getCoordinates(location);

      // For historical weather, adjust endpoint and parameters as per API documentation
      const response = await axios.get(
        `${HISTORICAL_URL}?lat=${lat}&lon=${lon}&apikey=5IDhU0L6ReLZw14TfIN1VUbKkq1X7OcG`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const previousWeekWeatherSlice = createSlice({
  name: 'previousWeekWeather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHistoricalWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default previousWeekWeatherSlice.reducer;
