import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  search: {
    cities: null,
    loading: false,
    status: "",
    error: false,
  },
};

export const fetchCities = createAsyncThunk("/search", async (city) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SEARCH_URL}${city}`);
  return response?.data;
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        state.search.loading = true;
        state.search.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.search.status = "succeded";
        state.search.cities = action.payload;
        state.search.loading = false;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.search.status = action.error.message;
        state.search.error = true;
      });
  },
});

export const selectSearchData = (state) => state.search.search;
export const { setCitySearch } = searchSlice.actions;
export default searchSlice.reducer;
