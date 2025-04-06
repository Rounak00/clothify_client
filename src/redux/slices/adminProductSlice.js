import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("admin/fetchAllProducts", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all-products`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createProduct = createAsyncThunk("admin/createProduct", async (productData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk("admin/updateProduct", async ({id,productData}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const  deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
       
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminProductSlice = createSlice({
      name: "adminProduct",
        initialState: {
            products: [],
            loading: false,
            error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload.data);
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index=state.products.findIndex(product=>product._id===action.payload.data._id);
                if(index!==-1){
                    state.products[index]=action.payload.data;
                }
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product._id !== action.payload._id);
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
        },
});
export default adminProductSlice.reducer;