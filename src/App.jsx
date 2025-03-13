import React from 'react';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-right' gutter={8} />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route>{/*Admin Layout*/}</Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App