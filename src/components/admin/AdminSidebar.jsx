import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { IoMdNavigate } from 'react-icons/io';
import { NavLink,Link, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
    const navigate=useNavigate();

    const handleLogOut=()=>{
        navigate("/")
    }
  return (
    <div className='p-6'>
        <div className="mb-6 text-white">
            <Link to="/admin" className="text-2xl font-medium">
             Clothify
            </Link>
        </div>
        <h2 className='text-xl font-medium text-center mb-6 text-white'>
            Admin Dashboard
        </h2>
        <nav className='flex flex-col space-y-2'>
            <NavLink to="/admin/users" className={({isActive})=>isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaUser/> <span>Users</span>
            </NavLink>
              <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                  <FaBoxOpen /> <span>Products</span>
              </NavLink>
              <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                  <FaClipboardList /> <span>Orders</span>
              </NavLink>
              <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                  <FaStore /> <span>Shop</span>
              </NavLink>
              <div className="mt-6">
                <button className=' w-full bg-red-500 hover:bg-red-600 py-2 px-4 text-white rounded flex items-center space-x-2 justify-center' onClick={handleLogOut}>
                    <FaSignOutAlt/>  <span>Log Out</span></button>
              </div>
        </nav>
    </div>
  )
}

export default AdminSidebar