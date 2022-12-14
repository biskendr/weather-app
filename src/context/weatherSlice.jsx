import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  weather: {
    location: null,
    current: null,
    forecast: null,
    loading: false,
    status: "",
    error: false,
  },
};

export const fetchWeather = createAsyncThunk("/weather", async (city) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_WEATHER_URL}${city}`);
  return response?.data;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.weather.loading = true;
        state.weather.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather.status = "succeded";
        state.weather.location = action.payload.location;
        state.weather.current = action.payload.current;
        state.weather.forecast = action.payload.forecast.forecastday;
        state.weather.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weather.status = action.error.message;
        state.weather.error = true;
      });
  },
});

export const selectWeatherData = (state) => state.weather.weather;
export const setWeatherData  = weatherSlice.actions;
export default weatherSlice.reducer;
