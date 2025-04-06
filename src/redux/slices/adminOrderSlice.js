import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk("admin/fetchAllOrders", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateOrderStatus = createAsyncThunk("admin/updateOrderStatus", async ({orderId, status}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-order-status/${orderId}`, {status}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteOrder = createAsyncThunk("admin/deleteOrder", async (orderId, {rejectWithValue}) => {        
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return orderId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data;
            state.totalOrders = action.payload.data.length;
            const totalSales = action.payload.data.reduce((acc, order) => acc + order.totalPrice, 0);
            state.totalSales = totalSales;
            state.error = null;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
            const updatedOrder = action.payload.data;
            const index = state.orders.findIndex(order => order._id === updatedOrder._id);
            if (index !== -1) {
                state.orders[index] = updatedOrder;
            }
            state.error = null;
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            const orderId = action.payload;
            state.orders = state.orders.filter(order => order._id !== orderId);
            state.error = null;
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    }
});
export default adminOrderSlice.reducer;