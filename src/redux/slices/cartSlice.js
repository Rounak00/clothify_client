import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({userId,guestId},{rejectWithValue}) => {
    try{
        const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{
            params:{
                userId,
                guestId
            }
        });
        return response.data;
    }catch(err){
       return rejectWithValue(err.response.data);
    }
  }
); 

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({productId,quantity,size,color,userId,guestId},{rejectWithValue}) => {
    try{
        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            userId,
            guestId,
            size,
            color 
        });
        return response.data;
    }catch(err){
       return rejectWithValue(err.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({productId,quantity,size,color,userId,guestId},{rejectWithValue}) => {
    try{
        const response= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            userId,
            guestId,
            size,
            color
        });
        return response.data;
    }catch(err){
       return rejectWithValue(err.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({productId,size,color,userId,guestId},{rejectWithValue}) => {
    try{
        const response= await axios({
            method: 'DELETE',
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: {
                productId,
                size,
                color,
                userId,
                guestId
            }
        });
        return response.data;
    }catch(err){
       return rejectWithValue(err.response.data);
    }
  }
);

export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({userId,guestId},{rejectWithValue}) => {
        try{
            const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{
                userId,
                guestId
            },{
                headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }});
            return response.data;
        }catch(err){
         return rejectWithValue(err.response.data);
        }
    }
);

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromLocalStorage(),
        loading:false,
        error:null,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]};
            localStorage.removeItem("cart");
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.data;
            saveCartToLocalStorage(action.payload.data);
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message || "Failed to fetch cart";
        })
        .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload.data;
            saveCartToLocalStorage(action.payload.data);
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to add item to cart";
        })
        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
           state.loading=false;
           state.cart=action.payload.data;
           saveCartToLocalStorage(action.payload.data);
        })
        .addCase(updateCartItemQuantity.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update cart";
        })
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload.data;
            saveCartToLocalStorage(action.payload.data);
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to remove item from cart";
        })
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(mergeCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload.data;
            saveCartToLocalStorage(action.payload.data);
        })
        .addCase(mergeCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to merge cart";
        })
    },
});
export const {clearCart}=cartSlice.actions;
export default cartSlice.reducer;

