import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all-users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addUser = createAsyncThunk("admin/addUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/add-user`, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk("admin/updateUser", async ({id,name,email,role}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-user/${id}`, {name,email,role}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
 });      

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.data);
                state.error = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser= action.payload.data;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users= state.users.filter((user) => user._id !== action.payload._id);
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});
 export  default  adminSlice.reducer; 