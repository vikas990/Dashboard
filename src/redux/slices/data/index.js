import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CYPTO_URL = "https://openapiv1.coinstats.app/coins";
export const fetchData = createAsyncThunk("fetchChartData", async () => {
  try {
    const response = await axios(CYPTO_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "o61NvpuVIv4IcVZ2zVnkKUI0PNO1mbB6OPHhAGOzL1I=",
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const dataSlice = createSlice({
  initialState: {
    isloading: false,
    data: null,
    error: false,
  },
  name: "chart Data",
  //  make reducers for this slice only
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isloading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

// export const { chartData } = dataSlice.actions;
export default dataSlice.reducer;
