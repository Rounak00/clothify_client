import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturedSection from '../components/products/FeaturedSection'

const placeHoldersProduct=[
  {
    _id: 1,
    name: "product 1",
    price: 1000,
    images: [{ url: "https://picsum.photos/500/500?random=1" }]
  }, {
    _id: 2,
    name: "product name 2",
    price: 1000,
    images: [{ url: "https://picsum.photos/500/500?random=2" }]
  },
  {
    _id: 3,
    name: "product name 3",
    price: 1000,
    images: [{ url: "https://picsum.photos/500/500?random=3" }]
  },
  {
    _id: 4,
    name: "product name 4",
    price: 1000,
    images: [{ url: "https://picsum.photos/500/500?random=4" }]
  }
]

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        <h2 className='text-3xl text-center font-bold mb-4'> Best Seller</h2>
        <ProductDetails/>

        <div className='container mx-auto '>
          <h2 className='text-center text-3xl font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid product={placeHoldersProduct}/>
        </div>
        <FeaturedCollection/>
        <FeaturedSection/>
    </div>
  )
}

export default Home