import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import orderReducer from './slices/orderSlice';
import adminReducer from './slices/adminSlice';
import adminProductSlice from './slices/adminProductSlice';
import adminOrderSlice from './slices/adminOrderSlice';
const store=configureStore({
    reducer:{
      auth:authReducer, 
      products :productReducer,
      cart:cartReducer,
      checkout:checkoutReducer,
      order:orderReducer,
      admin:adminReducer,
      adminProduct:adminProductSlice,
      adminOrder:adminOrderSlice,
    },
});

export default store;
