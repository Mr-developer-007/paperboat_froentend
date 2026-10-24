import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils";

export const getYears = createAsyncThunk("year/getYears", async () => {
  const response = await axios.get(`${base_url}/get/year`);
  return response.data;
});

const yearSlice = createSlice({
  name: "year",
  initialState: {
    info: [],
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(getYears.pending, (state) => {
        state.isLoading = true;
      })

      // Success
      .addCase(getYears.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload.year;
      })

      // Error
      .addCase(getYears.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default yearSlice.reducer;