import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../service/axiosInstance";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutData,{rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(`/api/checkout`, checkoutData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const checkoutSlice = createSlice({ 
    name: "checkout",
    initialState: {
        loading: false,
        checkout: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCheckout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkout = action.payload.data;
            state.error = null;
        })
        .addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
    });
export default checkoutSlice.reducer;