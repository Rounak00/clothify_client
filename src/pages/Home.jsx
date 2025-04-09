import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturedSection from '../components/products/FeaturedSection'
// import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// import { fetchProductsByFilters } from '../redux/slices/productSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'



const Home = () => {
  const dispatch = useDispatch();
  // const {products,loading,error}=useSelector((state)=>state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // dispatch(fetchProductsByFilters({
    //   gender:"Women",
    //   limit: 8,
    //   category: "Bottom Wear",
    // }));
    const fetchBestSeller = async () => {
      try {
        const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`);
        
          setBestSellerProduct(response.data.data);
        
      }catch (error) {
        toast.error("Error fetching best seller product");
      }
    }
    fetchBestSeller();
  },[dispatch]);
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        <h2 className='text-3xl text-center font-bold mb-4'> Best Seller</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <div className='text-center text-gray-500'>No Best Seller Products Available</div>
        )}
        

        {/* <div className='container mx-auto '>
          <h2 className='text-center text-3xl font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid product={products} loading={loading} error={error}/>
        </div>
        <div className='container mx-auto '>
          <h2 className='text-center text-3xl font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid product={products} loading={loading} error={error}/>
        </div> */}
        <FeaturedCollection/>
        <FeaturedSection/>
    </div>
  )
}

export default Home