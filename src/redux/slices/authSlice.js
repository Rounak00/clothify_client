import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialGuestId= localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//Log in
export const loginUser=createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,userData );
        if(response.data.success){
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            localStorage.setItem("userToken", response.data.token);
        }
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

//regiter
export const registerUser=createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`,userData );
        if(response.data.success){
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            localStorage.setItem("userToken", response.data.token);
        }
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})


//Slice 
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId",state.guestId);
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.setItem("guestId",state.guestId);
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload.data;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload.data;
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const {logout,generateNewGuestId}=authSlice.actions;
export default authSlice.reducer;