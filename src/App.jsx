import React from 'react';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import {Toaster} from "react-hot-toast"
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import ProductDetails from './components/products/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirnation from './pages/OrderConfirnation';
import OrderDetails from './pages/OrderDetails';
import MyOrders from './pages/MyOrders';
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' gutter={8} />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order/:id" element={<OrderDetails />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirnation />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="collections/:collection" element={<Collection />} />
      </Route>
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App