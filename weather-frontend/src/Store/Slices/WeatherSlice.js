import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { appId, hostName } from '../../config/config';

// Fetch current city data
export const getCityData = createAsyncThunk('city', async (obj) => {
  try {
    const request = await axios.get(
      `${hostName}/data/2.5/weather`,
      {
        params: {
          q: obj.city,
          units: obj.unit,
          APPID: appId,
        },
      }
    );
    return {
      data: request.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
});

export const get5DaysForecast = createAsyncThunk('5days', async (obj) => {
  try {
    const request = await axios.get(
      `${hostName}/data/2.5/forecast`,
      {
        params: {
          lat: obj.lat,
          lon: obj.lon,
          units: obj.unit,
          APPID: appId,
        },
      }
    );
    return request.data;
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
});

export const getPreviousWeekWeather = createAsyncThunk('previousWeek', async (obj) => {
  try {
    if (!obj.lat || !obj.lon) {
      throw new Error('Latitude and Longitude are required');
    }

    const sevenDaysAgo = Math.floor(Date.now() / 1000) - 604800; 
    const request = await axios.get(
      `${hostName}/data/2.5/onecall/timemachine`,
      {
        params: {
          lat: obj.lat,
          lon: obj.lon,
          dt: sevenDaysAgo,
          units: obj.unit || 'metric', 
          APPID: appId,
        },
      }
    );
    return request.data;
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    citySearchLoading: false,
    citySearchData: null,
    forecastLoading: false,
    forecastData: null,
    previousWeekLoading: false,
    previousWeekData: null,
    previousWeekError: null,
    forecastError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityData.pending, (state) => {
        state.citySearchLoading = true;
        state.citySearchData = null;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = action.payload;
      })
      .addCase(get5DaysForecast.pending, (state) => {
        state.forecastLoading = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = null;
        state.forecastError = action.error.message;
      })
      .addCase(getPreviousWeekWeather.pending, (state) => {
        state.previousWeekLoading = true;
        state.previousWeekData = null;
        state.previousWeekError = null;
      })
      .addCase(getPreviousWeekWeather.fulfilled, (state, action) => {
        state.previousWeekLoading = false;
        state.previousWeekData = action.payload;
        state.previousWeekError = null;
      })
      .addCase(getPreviousWeekWeather.rejected, (state, action) => {
        state.previousWeekLoading = false;
        state.previousWeekData = null;
        state.previousWeekError = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
