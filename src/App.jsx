import React from 'react';
import {BrowserRouter,Navigate,Route, Routes} from "react-router-dom"
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
import AdminLayout from './components/Layout/AdminLayout';
import AdminHomePage from './components/admin/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditPtoduct from './components/admin/EditPtoduct';
import OrderManagement from './components/admin/OrderManagement';
import {Provider} from "react-redux"
import store from "./redux/store"
import ProtectedRoute from './private/ProtectedRoute';
import ProductAdd from './components/admin/ProductAdd';
const App = () => {
  return (
    <Provider store={store}>
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
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>} >{/*Admin Layout*/}
       <Route index element={<AdminHomePage/>}/>
       <Route path='users' element={<UserManagement/>}/>
       <Route path="products" element={<ProductManagement/>}/>
       <Route path="products/add" element={<ProductAdd/>}/>
       <Route path="products/:id/edit" element={<EditPtoduct/>} />
       <Route path="orders" element={<OrderManagement/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App