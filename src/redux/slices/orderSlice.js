import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../service/axiosInstance";


export const fetchUserOrder = createAsyncThunk("order/fetchUserOrder", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/order/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchOrderDetails = createAsyncThunk("order/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/api/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        orderDetails: null,
        totalOrders: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data;
                state.error = null;
            })
            .addCase(fetchUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload.data;
                state.error = null;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});
export default orderSlice.reducer;