import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils";

export const getState = createAsyncThunk("state/getState", async () => {
  const response = await axios.get(`${base_url}/get/states`);
  return response.data;
});

const statesSlice = createSlice({
  name: "state",
  initialState: {
    info: [],
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(getState.pending, (state) => {
        state.isLoading = true;
      })

      // Success
      .addCase(getState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload.state;
      })

      // Error
      .addCase(getState.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default statesSlice.reducer;