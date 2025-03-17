import React from 'react'
import { Link } from 'react-router-dom'


const products=[
    {
        _id:1254,
        name:"Rounak",
        price:1100,
        sku:"1234514",
    }
]

const handleDelete =(productId)=>{
    if(window.confirm("Are you sure you want to delete the product?")){

    }
}
const ProductManagement = () => {
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>
            Product Management
        </h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className='min-w-full text-gray-500 text-left'>
               <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                <tr>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">SKU</th>
                          <th className="py-3 px-4">Actions</th>
                </tr>
               </thead>
               <tbody>
                {products.length>0 ? (
                        products.map((product)=>(
                            <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                        {product.name}
                                    </td>
                                <td className="p-4">₹ {product.price}</td>
                                <td className="p-4">{product.sku}</td>
                                <td className="p-4">
                                    <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'>
                                       Edit
                                    </Link>
                                    <button onClick={()=>handleDelete(product._id)}
                                     className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>Delete</button>
                                </td>
                            </tr>
                        ))
                ):(
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={4}>
                        No Products found
                    </td>
                  </tr>
                )}
               </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductManagement