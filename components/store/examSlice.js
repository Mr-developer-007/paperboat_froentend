import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils";

export const getExam = createAsyncThunk("exam/getExam", async () => {
  const response = await axios.get(`${base_url}/get/exams`);
  return response.data;
});

const examsSlice = createSlice({
  name: "exam",
  initialState: {
    info: [],
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(getExam.pending, (state) => {
        state.isLoading = true;
      })

      // Success
      .addCase(getExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload.exam;
      })

      // Error
      .addCase(getExam.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default examsSlice.reducer;