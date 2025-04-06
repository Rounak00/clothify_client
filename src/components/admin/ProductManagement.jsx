import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteProduct, fetchAllProducts } from '../../redux/slices/adminProductSlice';
import toast from 'react-hot-toast';
import axios from 'axios';


const ProductManagement = () => {
    const dispatch=useDispatch();
    const [removeImageLoader,setRemoveImageLoader]=useState(false)
    const {products,loading, error}=useSelector((state)=>state.adminProduct);
    useEffect(()=>{
        dispatch(fetchAllProducts());
    },[dispatch])
    const handleImageRemove = async (imageUrl) => {
      try {
        setRemoveImageLoader(true);
        if (!imageUrl) {
          toast.error("Image url is not provided");
        } else {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/upload/cloudinary-delete`,
            {
              data: { imageUrl },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          );
        }
      } catch (err) {
        toast.error("Error in image delete");
      } finally {
        setRemoveImageLoader(false);
      }
    };
    const handleDelete =async(productId,images)=>{
      try{ 
        if(window.confirm("Are you sure you want to delete the product?")){
          for (const image of images) {
            await handleImageRemove(image.url);
          }
      
          // Then delete the product
          await dispatch(deleteProduct(productId));
          toast.success("Product and associated images deleted successfully!");
        }
      }catch(error){toast.error("Error in deleting product or images")}
        
    }
    if(loading) return <p className='text-center text-gray-500'>Loading ...</p>
    if(error) return <p className='text-center text-gray-500'>Error : {error}</p>
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
                                    <button onClick={()=>handleDelete(product._id,product.images)}
                                     className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
                                      {removeImageLoader?"Deleting...":"Delete"}</button>
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