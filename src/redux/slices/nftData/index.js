import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NFT_URL = "https://openapiv1.coinstats.app/nft/trending";
export const fetchNFTData = createAsyncThunk("fetchChartData", async () => {
  try {
    const response = await axios(NFT_URL, {
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

export const nftDataSlice = createSlice({
  initialState: {
    isloading: false,
    data: null,
    error: false,
  },
  name: "chart Data",
  //  make reducers for this slice only
  extraReducers: (builder) => {
    builder.addCase(fetchNFTData.pending, (state, action) => {
      state.isloading = true;
    });

    builder.addCase(fetchNFTData.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchNFTData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

// export const { chartData } = dataSlice.actions;
export default nftDataSlice.reducer;
